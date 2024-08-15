require("dotenv").config({path: './.env'});
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    console.log(email, password);

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ source: 'email', message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({  source: 'password', message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: 1, token });
  } catch (error) {
    res.status(500).json({ data: error, message: 'Server error' });
  }
};