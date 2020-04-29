const axios = require('axios');
const rp = require('request-promise');
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
	const user = await admin.auth().createUser({
		email,
		password
	});
	const res_registeredData = await firestore_register_user_from_uid(user.uid, { firstName, lastName, phone });
	res.status(201).json({ sucess: true, data: user });
});

// @desc    Virtual a login from uid ( returning token for testing )
// @route   POST /api/auth/_login
// @acess   Private/Localhost
exports.virtualLogin = asyncHandler(async (req, res, next) => {
	const { uid } = req.body;
	const customToken = await admin.auth().createCustomToken(uid);
	const _res = await rp({
		url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env
			.FIREBASE_API_KEY}`,
		method: 'POST',
		body: {
			token: customToken,
			returnSecureToken: true
		},
		json: true
	});
	res.status(200).json({ sucess: true, token: _res.idToken });
});
