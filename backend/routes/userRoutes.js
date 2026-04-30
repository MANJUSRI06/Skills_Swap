const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateUserSkills, discoverPeers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/me').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/skills').put(protect, updateUserSkills);
router.route('/discover').get(protect, discoverPeers);

module.exports = router;
