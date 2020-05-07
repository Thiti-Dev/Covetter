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
const { getAllDataFromCollection, getDataFromCollection } = require('../utils/firestore-utils');
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

// @desc    Get all of the routine quizes in the firestore database
// @route   GET /api/routine
// @acess   Public
exports.getAllRoutineQuiz = asyncHandler(async (req, res, next) => {
	const quizes = await getAllDataFromCollection('routine_quiz');
	res.status(200).json({ sucess: true, data: quizes });
});

// @desc    Answer the routine quiz
// @route   POST /api/routine/:quiz_id/answer
// @acess   Private
exports.answerRoutineQuiz = asyncHandler(async (req, res, next) => {
	const { quiz_id } = req.params;
	const { answer } = req.body;
	let quiz_data;
	//const _res = await db.collection('routine_quiz').where('quiz_id', '==', quiz_id).limit(1).get();
	const _data = await getDataFromCollection('routine_quiz', {
		limit: 1,
		query: { key: 'quiz_id', operator: '==', matchValue: quiz_id }
	});
	if (_data.empty) {
		return next(new ErrorResponse(`The quiz with id:${quiz_id} isn't exist`, 404));
	}
	quiz_data = _data.first();

	const _res = await db.collection('users').doc(req.user).collection('routine_answers').add({
		quiz_id: quiz_id,
		quiz_answer: answer
	});

	res.status(200).json({ sucess: true, data: _res.id });
});
