const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Moderator credentials
const MODERATOR = {
  email: 'admin@admin.com',
  password: 'admin123',
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === MODERATOR.email && password === MODERATOR.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
