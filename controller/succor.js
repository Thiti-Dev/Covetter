const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const formattedLog = require('../utils/formatted-log');

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
// ────────────────────────────────────────────────────────────────────────────────

// @desc    Get all of the supoorted location data
// @route   GET /api/succor/
// @acess   Public
exports.getAllSupportedData = asyncHandler(async (req, res, next) => {
	const awareness_data = await getAllDataFromCollection('succor');
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
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}
	// ────────────────────────────────────────────────────────────────────────────────
	const _upload_url = await uploadPhotoToStorage(req.file, 'images');

	const lat = parseInt(req.body.lat);
	const lng = parseInt(req.body.lng);

	const geo_res = await geocoder.reverse({
		lat: lat,
		lon: lng
	});
	const _res = await geocollection.add({
		description: req.body.description,
		address: geo_res[0].formattedAddress,
		photo_url: _upload_url,
		coordinates: new admin.firestore.GeoPoint(lat, lng),
		createdAt: FieldValue.serverTimestamp(),
		endAt: admin.firestore.Timestamp.fromDate(new Date(req.body.endAt))
	});
	res.status(200).json({ sucess: true, data: _res.id });
});
