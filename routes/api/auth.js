const express = require('express');
const router = express.Router();

const validateRegister = require('../../utils/validations/register');
const validateLogin = require('../../utils/validations/login');
const { register, login, virtualLogin } = require('../../controller/auth');

const { protect } = require('../../middleware/auth');

router.route('/register').post(validateRegister, register);
router.route('/_login').post(virtualLogin);
module.exports = router;
