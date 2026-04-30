const Message = require('../models/Message');
const SwapRequest = require('../models/SwapRequest');

// @desc    Get messages for a specific swap request
// @route   GET /api/messages/:requestId
// @access  Private
const getMessages = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.requestId);

    if (!swapRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Verify the user is part of the swap request
    if (swapRequest.sender.toString() !== req.user._id.toString() && swapRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view this chat' });
    }

    // Must be accepted
    if (swapRequest.status !== 'accepted') {
      return res.status(400).json({ message: 'Chat is only available for accepted swaps' });
    }

    const messages = await Message.find({ swapRequest: req.params.requestId }).populate('sender', 'name avatarImage avatarColor');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Send a message
// @route   POST /api/messages/:requestId
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.requestId);

    if (!swapRequest || swapRequest.status !== 'accepted') {
      return res.status(400).json({ message: 'Invalid or unaccepted request' });
    }

    if (swapRequest.sender.toString() !== req.user._id.toString() && swapRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const newMessage = new Message({
      swapRequest: req.params.requestId,
      sender: req.user._id,
      text: req.body.text,
    });

    const savedMessage = await newMessage.save();
    // Populate sender info before returning
    await savedMessage.populate('sender', 'name avatarImage avatarColor');
    
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get total unread messages count for current user
// @route   GET /api/messages/unread-count
// @access  Private
const getUnreadCount = async (req, res) => {
  try {
    // Find all accepted requests where user is sender or receiver
    const requests = await SwapRequest.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: 'accepted'
    });
    
    const requestIds = requests.map(req => req._id);

    // Count messages in these requests where sender is NOT current user and read is false
    const count = await Message.countDocuments({
      swapRequest: { $in: requestIds },
      sender: { $ne: req.user._id },
      read: false
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Mark messages in a request as read
// @route   PUT /api/messages/:requestId/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    await Message.updateMany({
      swapRequest: req.params.requestId,
      sender: { $ne: req.user._id },
      read: false
    }, {
      $set: { read: true }
    });

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getUnreadCount,
  markAsRead,
};
