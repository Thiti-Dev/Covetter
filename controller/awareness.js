const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const formattedLog = require('../utils/formatted-log');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const Geopoint = admin.firestore.GeoPoint;
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FIRESTORE UTILS ────────────────────────────────────────────────────────────
//
const { getAllDataFromCollection } = require('../utils/firestore-utils');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
let objKeyFilter = require('../utils/objectKeyFilter');
const geocoder = require('../utils/geocoder');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── GEOFIRESTORE ( FOR FINDING THE NEAREST LOCATION FROM POINT) ────────────────
//
var GeoFirestore = require('geofirestore');
const geofirestore = new GeoFirestore.GeoFirestore(db);
const geocollection = geofirestore.collection('awareness_data');
// ────────────────────────────────────────────────────────────────────────────────

exports.getAllAwarenessLocationAndInfo = asyncHandler(async (req, res, next) => {
	const awareness_data = await getAllDataFromCollection('awareness_data');
	res.status(200).json({ sucess: true, data: awareness_data });
});

exports.commitNewAwarenessData = asyncHandler(async (req, res, next) => {
	const staged_awareness_data = objKeyFilter(req.body, [ 'reason', 'involved', 'position' ]);
	const geo_res = await geocoder.reverse({
		lat: staged_awareness_data.position.lat,
		lon: staged_awareness_data.position.lng
	});
	const _res = await geocollection.add({
		...staged_awareness_data,
		address: geo_res[0].formattedAddress,
		coordinates: new admin.firestore.GeoPoint(
			staged_awareness_data.position.lat,
			staged_awareness_data.position.lng
		),
		createdAt: FieldValue.serverTimestamp()
	});
	res.status(200).json({ sucess: true, data: _res.id });
});

exports.getNearestAwarenessLocationData = asyncHandler(async (req, res, next) => {
	// Get the nearest point with the radius of [ 15 kilimeter ]
	// 9 in radius = 7.2 kilometer in real unit [ Estimation ]
	const query = await geocollection
		.near({ center: new admin.firestore.GeoPoint(14.6608171, 100.4070641), radius: 15 })
		.get();

	if (query.empty) {
		return res.status(200).json({ sucess: true, data: [] });
	}

	const _found_ids = query.docs.reduce((prev, _data) => {
		//Add its reference to the list
		return prev.concat(db.collection('awareness_data').doc(_data.id));
	}, []);

	/* @COMMENTED OUT BECAUSE this method work only ids within 1-10 documents

	const fetched_location = await db
		.collection('awareness_data')
		.where(admin.firestore.FieldPath.documentId(), 'in', _found_ids)
		.get();
	*/

	const _fetched_location = await db.getAll(..._found_ids);
	const fetched_location = _fetched_location.map((doc) => {
		const _data = doc.data().d;
		return {
			address: _data.address,
			position: _data.position,
			reason: _data.reason,
			involved: _data.involved
		};
	});

	res.status(200).json({ sucess: true, data: fetched_location });
});
