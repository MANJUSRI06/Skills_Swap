const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const colors = ['#1E1B4B', '#0B1120', '#FF7F50', '#00E5FF', '#8B5CF6', '#10B981'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const user = await User.create({
      name,
      email,
      password,
      avatarColor: randomColor,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarColor: user.avatarColor,
        avatarImage: user.avatarImage,
        department: user.department,
        year: user.year,
        bio: user.bio,
        skillsTeach: user.skillsTeach,
        skillsLearn: user.skillsLearn,
        availability: user.availability,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarColor: user.avatarColor,
        avatarImage: user.avatarImage,
        department: user.department,
        year: user.year,
        bio: user.bio,
        skillsTeach: user.skillsTeach,
        skillsLearn: user.skillsLearn,
        availability: user.availability,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  registerUser,
  authUser,
};
