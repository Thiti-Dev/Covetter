const express = require('express');
const router = express.Router();

const { getAllSupportedData, commitCharity, getNearestCharityLocationData } = require('../../controller/succor');

const { protect } = require('../../middleware/auth');

const upload = require('../../utils/multer');

// Use any() for an dynamic specification
router.route('/').get(getAllSupportedData).post(protect, upload.single('file'), commitCharity);
router.route('/nearest').post(getNearestCharityLocationData);
module.exports = router;
