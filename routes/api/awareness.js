const express = require('express');
const router = express.Router();

const { getAllAwarenessLocationAndInfo, commitNewAwarenessData } = require('../../controller/awareness');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllAwarenessLocationAndInfo).post(protect, commitNewAwarenessData);
module.exports = router;
