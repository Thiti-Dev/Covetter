const express = require('express');
const router = express.Router();

const { getAllSupportedData } = require('../../controller/succor');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllSupportedData);
module.exports = router;
