const express = require('express');
const router = express.Router();

const { getAllSupportedData, commitCharity, getNearestCharityLocationData } = require('../../controller/succor');

const { protect } = require('../../middleware/auth');

const multer = require('multer');
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
	}
});

// Use any() for an dynamic specification
router.route('/').get(getAllSupportedData).post(protect, upload.single('file'), commitCharity);
router.route('/nearest').post(getNearestCharityLocationData);
module.exports = router;
