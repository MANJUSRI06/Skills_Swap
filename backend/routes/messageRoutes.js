const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getUnreadCount, markAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/unread-count').get(protect, getUnreadCount);

router.route('/:requestId/read').put(protect, markAsRead);

router.route('/:requestId')
  .get(protect, getMessages)
  .post(protect, sendMessage);

module.exports = router;
