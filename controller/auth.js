const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── VALIDATION ─────────────────────────────────────────────────────────────────
//
const validateRegister = require('../utils/validations/register');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//
const firestore_register_user_from_uid = (uid, credentials) => {
	return new Promise((resolve, reject) => {
		let docRef = db.collection('users').doc(uid);
		docRef.set(credentials).then(resolve).catch(reject);
	});
};
// ────────────────────────────────────────────────────────────────────────────────

// @desc    Register user
// @route   POST /api/auth/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
	const { email, password, confirmPassword, firstName, lastName, phone } = req.body;
	const { isError, errors } = validateRegister(req.body);

	if (isError) {
		return next(new ErrorResponse(`Validation Error`, 400, errors));
	}
	const user = await admin.auth().createUser({
		email,
		password
	});
	const res_registeredData = await firestore_register_user_from_uid(user.uid, { firstName, lastName, phone });
	res.status(201).json({ sucess: true, data: user });
});
