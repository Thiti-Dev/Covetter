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
const {
	getAllDataFromCollection,
	getDataFromCollection,
	extractDataFromCollectionToObjWithKeyReady
} = require('../utils/firestore-utils');
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

	// Answer Validation
	const quiz_type_str = [];
	quiz_type_str[0] = 'boolean';
	quiz_type_str[1] = 'string';
	quiz_type_str[2] = 'number';
	quiz_type_str[3] = 'string';
	const asnwer_type = typeof answer;
	if (
		(quiz_data.quiz_type === 0 && asnwer_type !== 'boolean') ||
		(quiz_data.quiz_type === 1 && asnwer_type !== 'string') ||
		(quiz_data.quiz_type === 2 && asnwer_type !== 'number') ||
		(quiz_data.quiz_type === 3 && asnwer_type !== 'string')
	) {
		return next(
			new ErrorResponse(
				`The answer of quiz_id:${quiz_id} should has type of ${quiz_type_str[quiz_data.quiz_type]}`,
				400
			)
		);
	}

	const _res = await db.collection('users').doc(req.user).collection('routine_answers').add({
		quiz_id: quiz_id,
		quiz_answer: answer,
		createdAt: FieldValue.serverTimestamp()
	});

	res.status(200).json({ sucess: true, data: _res.id });
});

// @desc    Get all of the routine quizes in the firestore database
// @route   GET /api/routine/selfanswer
// @acess   Private
exports.getAllUserAnswerQuiz = asyncHandler(async (req, res, next) => {
	const routine_quizes = await extractDataFromCollectionToObjWithKeyReady('routine_quiz', 'quiz_id');
	const quizes_answer = await db.collection('users').doc(req.user).collection('routine_answers').get();
	const quizes_answer_data = quizes_answer.docs.map((doc) => {
		let docData = doc.data();
		docData.id = doc.id; // assign the id of every docs
		docData.routine_quiz = routine_quizes[docData.quiz_id];
		return docData;
	});
	res.status(200).json({ sucess: true, data: quizes_answer_data });
});
