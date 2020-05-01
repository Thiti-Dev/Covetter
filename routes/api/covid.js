const express = require('express');
const router = express.Router();

const { getTodayCovidStatistic } = require('../../controller/covid');

const { protect } = require('../../middleware/auth');

router.route('/today').get(getTodayCovidStatistic);
module.exports = router;
