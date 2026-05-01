const express = require('express');
const router = express.Router();
const { askChatbot } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

// You can add 'protect' middleware if you want only logged-in users to use it
router.route('/ask').post(protect, askChatbot);

module.exports = router;
