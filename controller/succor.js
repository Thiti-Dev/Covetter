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

// @desc    Get all of the supoorted location data
// @route   GET /api/succor/
// @acess   Public
exports.getAllSupportedData = asyncHandler(async (req, res, next) => {
	const awareness_data = await getAllDataFromCollection('succor');
	res.status(200).json({ sucess: true, data: awareness_data });
});
