const _ = require('lodash');
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
	}
];

module.exports = (req_body) => {
	return validate(required_field, req_body);
};
