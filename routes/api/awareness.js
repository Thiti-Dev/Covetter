const express = require('express');
const router = express.Router();

const {
	getAllAwarenessLocationAndInfo,
	commitNewAwarenessData,
	getNearestAwarenessLocationData
} = require('../../controller/awareness');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllAwarenessLocationAndInfo).post(protect, commitNewAwarenessData);
router.route('/nearest').get(getNearestAwarenessLocationData);
module.exports = router;
