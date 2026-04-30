const express = require('express');
const router = express.Router();
const { sendRequest, getRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/send').post(protect, sendRequest);
router.route('/').get(protect, getRequests);
router.route('/:id/accept').put(protect, (req, res) => updateRequestStatus(req, res, 'accepted'));
router.route('/:id/reject').put(protect, (req, res) => updateRequestStatus(req, res, 'rejected'));

module.exports = router;
