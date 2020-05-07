const express = require('express');
const router = express.Router();

const { getAllRoutineQuiz, answerRoutineQuiz } = require('../../controller/routine');

const { protect } = require('../../middleware/auth');

router.route('/').get(getAllRoutineQuiz);
router.route('/:quiz_id/answer').post(protect, answerRoutineQuiz);
module.exports = router;
