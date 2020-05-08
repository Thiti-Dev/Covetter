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
const { getAllDataFromCollection } = require('../utils/firestore-utils');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
let objKeyFilter = require('../utils/objectKeyFilter');
// ────────────────────────────────────────────────────────────────────────────────

exports.getAllAwarenessLocationAndInfo = asyncHandler(async (req, res, next) => {
	const awareness_data = await getAllDataFromCollection('awareness_data');
	res.status(200).json({ sucess: true, data: awareness_data });
});

exports.commitNewAwarenessData = asyncHandler(async (req, res, next) => {
	const staged_awareness_data = objKeyFilter(req.body, [ 'reason', 'involved', 'position' ]);
	const _res = await db.collection('awareness_data').add({
		...staged_awareness_data,
		createdAt: FieldValue.serverTimestamp()
	});
	res.status(200).json({ sucess: true, data: _res.id });
});
