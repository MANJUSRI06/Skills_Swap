const SwapRequest = require('../models/SwapRequest');

// @desc    Send a swap request
// @route   POST /api/requests/send
// @access  Private
const sendRequest = async (req, res) => {
  try {
    const { receiverId, message, matchScore } = req.body;

    // Check if request already exists
    const existingRequest = await SwapRequest.findOne({
      sender: req.user._id,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent to this user' });
    }

    const swapRequest = new SwapRequest({
      sender: req.user._id,
      receiver: receiverId,
      message,
      matchScore,
    });

    const createdRequest = await swapRequest.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user's swap requests (both incoming and outgoing)
// @route   GET /api/requests
// @access  Private
const getRequests = async (req, res) => {
  try {
    const Message = require('../models/Message');
    
    const incomingRequests = await SwapRequest.find({ receiver: req.user._id }).populate('sender', 'name avatarImage avatarColor skillsTeach skillsLearn').lean();
    const outgoingRequests = await SwapRequest.find({ sender: req.user._id }).populate('receiver', 'name avatarImage avatarColor skillsTeach skillsLearn').lean();

    const unreadMessages = await Message.aggregate([
      { $match: { sender: { $ne: req.user._id }, read: false } },
      { $group: { _id: '$swapRequest', count: { $sum: 1 } } }
    ]);

    const unreadMap = {};
    unreadMessages.forEach(um => {
      unreadMap[um._id.toString()] = um.count;
    });

    const addUnreadCount = (reqs) => reqs.map(r => ({
      ...r,
      unreadCount: unreadMap[r._id.toString()] || 0
    }));

    res.json({
      incoming: addUnreadCount(incomingRequests),
      outgoing: addUnreadCount(outgoingRequests),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update request status (accept/reject)
// @route   PUT /api/requests/:id/accept or reject
// @access  Private
const updateRequestStatus = async (req, res, status) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (swapRequest) {
      // Ensure the logged-in user is the receiver of the request
      if (swapRequest.receiver.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this request' });
      }

      swapRequest.status = status;
      const updatedRequest = await swapRequest.save();

      res.json(updatedRequest);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  sendRequest,
  getRequests,
  updateRequestStatus,
};
