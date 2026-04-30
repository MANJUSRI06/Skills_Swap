const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  swapRequest: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SwapRequest',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
