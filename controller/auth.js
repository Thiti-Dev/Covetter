const axios = require('axios');
const rp = require('request-promise');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();

// FUNC
const fieldValue = admin.firestore.FieldValue;
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── VALIDATION ─────────────────────────────────────────────────────────────────
//
const validateRegister = require('../utils/validations/register');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
let objKeyFilter = require('../utils/objectKeyFilter');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FIRESTORE UTILS ────────────────────────────────────────────────────────────
//
const { uploadPhotoToStorage } = require('../utils/firestore-utils');
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

// @desc    Get user credentials ( profile data)
// @route   GET /api/auth
// @acess   Private
exports.getUserProfileData = asyncHandler(async (req, res, next) => {
	let userRef = db.collection('users').doc(req.user);
	const _res = await userRef.get();
	if (!_res.exists) {
		return next(new ErrorResponse(`This user isn't exist on the database`, 404));
	}
	const user_data = _res.data();
	res.status(200).json({ success: true, data: user_data });
});

// @desc    Update user credentials ( update profile data)
// @route   PUT /api/auth
// @acess   Private
exports.updateUserProfileData = asyncHandler(async (req, res, next) => {
	let userRef = db.collection('users').doc(req.user);
	const _res = await userRef.get();
	if (!_res.exists) {
		return next(new ErrorResponse(`This user isn't exist on the database`, 404));
	}
	// Field Avoidance
	const finalized_update_data = objKeyFilter(req.body, [ 'firstName', 'lastName', 'phone' ]);
	const _res_update = await userRef.update(finalized_update_data);
	res.status(200).json({ success: true, data: _res_update });
});

// @desc    Update user profile image
// @route   PUT /api/auth/upload_photo
// @acess   Private
exports.updateUserProfilePhoto = asyncHandler(async (req, res, next) => {
	let userRef = db.collection('users').doc(req.user);
	const _res = await userRef.get();
	if (!_res.exists) {
		return next(new ErrorResponse(`This user isn't exist on the database`, 404));
	}

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
	const _upload_url = await uploadPhotoToStorage(req.file, 'profile-images', req.user, false);

	const _update_res = await userRef.update({
		photo_url: _upload_url
	});

	res.status(200).json({ success: true, data: _upload_url });
});
