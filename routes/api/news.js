const express = require('express');
const router = express.Router();

const { getSupportedNews } = require('../../controller/news');

const { protect } = require('../../middleware/auth');

router.route('/fetchtask').get(getSupportedNews); // @TODO => Restrain from using in every situation => only be accessible with the admin/developer only
module.exports = router;
