const express = require('express');
const router = express.Router();

const validateRegister = require('../../utils/validations/register');
const validateLogin = require('../../utils/validations/login');
const {
	register,
	login,
	virtualLogin,
	getUserProfileData,
	updateUserProfileData,
	updateUserProfilePhoto
} = require('../../controller/auth');

const { protect } = require('../../middleware/auth');

const upload = require('../../utils/multer');

router.route('/register').post(validateRegister, register);
router.route('/_login').post(virtualLogin);
router.route('/').get(protect, getUserProfileData).put(protect, updateUserProfileData);
router.route('/upload_photo').put(protect, upload.single('file'), updateUserProfilePhoto);
module.exports = router;
