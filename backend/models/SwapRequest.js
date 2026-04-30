const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  matchScore: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

module.exports = SwapRequest;
