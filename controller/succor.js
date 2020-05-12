const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const formattedLog = require('../utils/formatted-log');

const moment = require('moment');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FIRESTORE UTILS ────────────────────────────────────────────────────────────
//
const { getAllDataFromCollection, uploadPhotoToStorage } = require('../utils/firestore-utils');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── GEOFIRESTORE ( FOR FINDING THE NEAREST LOCATION FROM POINT) ────────────────
//
var GeoFirestore = require('geofirestore');
const geofirestore = new GeoFirestore.GeoFirestore(db);
const geocollection = geofirestore.collection('succor');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
const geocoder = require('../utils/geocoder');
const { isDateWithinDays } = require('../utils/time-utils');
// ────────────────────────────────────────────────────────────────────────────────

// @desc    Get all of the supoorted location data
// @route   GET /api/succor/
// @acess   Public
exports.getAllSupportedData = asyncHandler(async (req, res, next) => {
	const awareness_data = await getAllDataFromCollection('succor', 'd'); // prepending into the d key
	res.status(200).json({ sucess: true, data: awareness_data });
});

// @desc    Committing the charity/succor
// @route   POST /api/succor/
// @acess   Private
exports.commitCharity = asyncHandler(async (req, res, next) => {
	//
	// ─── CHECK FOR FILE UPLOAD FIRST ─────────────────────────────────────────────────────────
	//

	if (!req.file) {
		return next(new ErrorResponse(`Please upload a photo`, 400));
	}

	const file = req.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}
	// ────────────────────────────────────────────────────────────────────────────────
	//
	// ─── CHECK IF THE HOUR WAS RIGHT AND WAS PASSED ────────────────────────────────────────────────
	//
	let _estimated_end_date;
	if (req.body.estimated_hour) {
		const hour = parseInt(req.body.estimated_hour);
		if (!hour) {
			return next(new ErrorResponse(`estimated_hour should be in number or string of number`, 400));
		}
		if (hour < 1 || hour > 24) {
			return next(
				new ErrorResponse(`estimated_hour mustn't not less than 1 hour and mustn't more than 24 hours`, 400)
			);
		}
		_estimated_end_date = moment().add(hour, 'hours').toDate();
	} else {
		return next(new ErrorResponse(`estimated_hour should be specified`, 400));
	}
	// ────────────────────────────────────────────────────────────────────────────────

	const _upload_url = await uploadPhotoToStorage(req.file, 'images');

	const lat = parseFloat(req.body.lat);
	const lng = parseFloat(req.body.lng);

	let _address = {};
	try {
		const geo_res = await geocoder.reverse({
			lat: lat,
			lon: lng
		});
		// if able to get the address
		_address.address = geo_res[0].formattedAddress;
	} catch (error) {
		// don't do nothing
	}
	const _res = await geocollection.add({
		..._address,
		description: req.body.description,
		photo_url: _upload_url,
		position: {
			lat,
			lng
		},
		coordinates: new admin.firestore.GeoPoint(lat, lng),
		createdAt: FieldValue.serverTimestamp(),
		endAt: admin.firestore.Timestamp.fromDate(_estimated_end_date)
	});
	res.status(200).json({ sucess: true, data: _res.id });
});

// @desc    Get the nearest data of the places that having the succor [ within 15 km ]
// @route   POST /api/succor/nearest
// @acess   Public
exports.getNearestCharityLocationData = asyncHandler(async (req, res, next) => {
	const { lat, lng } = req.body;
	// Validation
	if (typeof lat !== 'number' || typeof lng !== 'number') {
		return next(
			new ErrorResponse(`Request body is invalid, must've  contained {lat,lng} with the number type`, 400)
		);
	}
	// Get the nearest point with the radius of [ 15 kilimeter ]
	// 9 in radius = 7.2 kilometer in real unit [ Estimation ]
	const query = await geocollection.near({ center: new admin.firestore.GeoPoint(lat, lng), radius: 15 }).get();

	if (query.empty) {
		return res.status(200).json({ sucess: true, data: [] });
	}

	const _found_ids = query.docs.reduce((prev, _data) => {
		//Add its reference to the list
		return prev.concat(db.collection('succor').doc(_data.id));
	}, []);

	/* @COMMENTED OUT BECAUSE this method work only ids within 1-10 documents

	const fetched_location = await db
		.collection('awareness_data')
		.where(admin.firestore.FieldPath.documentId(), 'in', _found_ids)
		.get();
	*/

	const _fetched_location = await db.getAll(..._found_ids);
	const fetched_location = _fetched_location
		.map((doc) => {
			const _data = doc.data().d;
			// If the event isn't ended yet
			const now = new Date();
			const _end_date = new Date(_data.endAt.toDate());
			if (now < _end_date) {
				return {
					id: doc.id,
					address: _data.address,
					position: _data.position,
					description: _data.description,
					createdAt: _data.createdAt.toDate(),
					endAt: _data.endAt.toDate()
				};
			}
		})
		.filter((element) => element); // Filtering out the skipped one (null/undefiine)

	res.status(200).json({ sucess: true, data: fetched_location });
});
