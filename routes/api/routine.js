const express = require('express');
const router = express.Router();

const { getAllRoutineQuiz } = require('../../controller/routine');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllRoutineQuiz);
module.exports = router;
