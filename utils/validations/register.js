const ErrorResponse = require('../errorResponse');
const { validate } = require('../validations');

const required_field = [
	{
		name: 'email',
		email: true
	},
	{
		name: 'password',
		min: 5,
		max: 30,
		required: true
	},
	{
		name: 'confirmPassword',
		matchWith: 'password',
		required: true
	},
	{
		name: 'phone',
		fixLength: [ 10, 'Invalid phone number' ],
		required: true
	}
];

module.exports = (req, res, next) => {
	const { isError, errors } = validate(required_field, req.body);

	if (isError) {
		return next(new ErrorResponse(`Validation Error`, 400, errors));
	}
	next();
};
