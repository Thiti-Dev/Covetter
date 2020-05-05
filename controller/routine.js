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
// ─── DESC ───────────────────────────────────────────────────────────────────────
//
// QUIZ TYPE
// TYPE 0 === BOOLEAN
// TYPE 1 === ANY STRING
// TYPE 2 === NUMBER ONLY
// TYPE 3 === INPUT WHEELS [ need extra field to strore the option]
// ────────────────────────────────────────────────────────────────────────────────

exports.getAllRoutineQuiz = asyncHandler(async (req, res, next) => {
	let quizRef = db.collection('routine_quiz');
	const _res = await quizRef.get();
	const quizes = _res.docs.map((doc) => {
		const docData = doc.data();
		docData.id = doc.id; // assign the id of every docs
		return docData;
	});
	res.status(200).json({ sucess: true, data: quizes });
});
