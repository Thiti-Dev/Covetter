const express = require('express');
const router = express.Router();

const validateRegister = require('../../utils/validations/register');

const { register } = require('../../controller/auth');
router.route('/register').post(validateRegister, register);
module.exports = router;
