const admin = require('../utils/firebase/firebase-service');
const asyncHandler = require('../middleware/async');
exports.register = asyncHandler(async (req, res, next) => {
	const { email, password, confirmPassword } = req.body;

	const user = await admin.auth().createUser({
		email,
		password,
		confirmPassword
	});

	res.status(201).json({ sucess: true, data: user });
});
