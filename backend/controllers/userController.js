const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.department = req.body.department || user.department;
      user.year = req.body.year || user.year;
      user.bio = req.body.bio || user.bio;
      user.availability = req.body.availability || user.availability;
      if (req.body.avatarImage !== undefined) {
        user.avatarImage = req.body.avatarImage;
      }

      const updatedUser = await user.save();

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update user skills
// @route   PUT /api/users/skills
// @access  Private
const updateUserSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.skillsTeach) {
        user.skillsTeach = req.body.skillsTeach;
      }
      if (req.body.skillsLearn) {
        user.skillsLearn = req.body.skillsLearn;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Discover peers with match score
// @route   GET /api/users/discover
// @access  Private
const discoverPeers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');

    const peersWithScores = users.map(peer => {
      let matchScore = 0;

      // Current user wants to learn what peer can teach (+50)
      const wantsToLearnMatch = currentUser.skillsLearn.some(skill => 
        peer.skillsTeach.includes(skill)
      );
      if (wantsToLearnMatch) matchScore += 50;

      // Peer wants to learn what current user can teach (+40)
      const canTeachMatch = currentUser.skillsTeach.some(skill => 
        peer.skillsLearn.includes(skill)
      );
      if (canTeachMatch) matchScore += 40;

      // Same availability (+10)
      if (currentUser.availability && peer.availability && currentUser.availability === peer.availability) {
        matchScore += 10;
      }

      return {
        ...peer.toObject(),
        matchScore
      };
    });

    // Sort by match score descending
    peersWithScores.sort((a, b) => b.matchScore - a.matchScore);

    res.json(peersWithScores);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserSkills,
  discoverPeers,
};
