const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const formattedLog = require('../utils/formatted-log');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FIRESTORE UTILS ────────────────────────────────────────────────────────────
//
const { getAllDataFromCollection } = require('../utils/firestore-utils');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── DESC ───────────────────────────────────────────────────────────────────────
//
// QUIZ TYPE
// TYPE 0 === BOOLEAN
// TYPE 1 === ANY STRING
// TYPE 2 === NUMBER ONLY
// TYPE 3 === INPUT WHEELS [ need extra field to strore the option]
// ────────────────────────────────────────────────────────────────────────────────

exports.getAllRoutineQuiz = asyncHandler(async (req, res, next) => {
	const quizes = await getAllDataFromCollection('routine_quiz');
	res.status(200).json({ sucess: true, data: quizes });
});
