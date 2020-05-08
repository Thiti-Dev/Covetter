const express = require('express');
const router = express.Router();

const { getAllAwarenessLocationAndInfo } = require('../../controller/awareness');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllAwarenessLocationAndInfo);
module.exports = router;
