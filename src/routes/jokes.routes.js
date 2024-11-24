const express = require('express');
const { approveJoke, rejectJoke, getPendingJokes } = require('../controllers/jokes.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Routes
router.get('/pending', authMiddleware, getPendingJokes);
router.post('/:id/approve', authMiddleware, approveJoke);
router.post('/:id/reject', authMiddleware, rejectJoke);

module.exports = router;
