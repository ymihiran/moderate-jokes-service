const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Moderator credentials
const MODERATOR = {
  email: 'admin@admin.com',
  password: 'admin123',
};

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API for moderator login
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and generate a JWT token for the moderator
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The moderator's email address
 *               password:
 *                 type: string
 *                 description: The moderator's password
 *     responses:
 *       200:
 *         description: Successfully logged in, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The generated JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === MODERATOR.email && password === MODERATOR.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
