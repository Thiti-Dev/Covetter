const admin = require('../utils/firebase/firebase-service');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//
// ─── VALIDATION ─────────────────────────────────────────────────────────────────
//
const validateRegister = require('../utils/validations/register');
// ────────────────────────────────────────────────────────────────────────────────

exports.register = asyncHandler(async (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	const { isError, errors } = validateRegister(req.body);

	if (isError) {
		return next(new ErrorResponse(`Validation Error`, 400, errors));
	}
	const user = await admin.auth().createUser({
		email,
		password
	});
	res.status(201).json({ sucess: true, data: user });
});
