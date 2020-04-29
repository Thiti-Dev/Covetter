const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

//
// ─── DB ─────────────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
// ────────────────────────────────────────────────────────────────────────────────

// Protect routes
exports.protect = asyncHandler((req, res, next) => {
	if (req.headers.authorization) {
		admin
			.auth()
			.verifyIdToken(req.headers.authorization)
			.then(() => {
				next();
			})
			.catch(() => {
				return next(new ErrorResponse('Not authorize to access this route', 401));
			});
	} else {
		return next(new ErrorResponse('Not authorize to access this route', 401));
	}
});
