/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: Jokes moderation API
 */

const express = require('express');
const { approveJoke, rejectJoke, getPendingJokes } = require('../controllers/jokes.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /http://localhost:3001/jokes/pending:
 *   get:
 *     summary: Get all pending jokes
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []  # This tells Swagger UI that this endpoint requires a Bearer token
 *     responses:
 *       200:
 *         description: List of pending jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   type:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/pending', authMiddleware, getPendingJokes);

/**
 * @swagger
 * /jokes/{id}/approve:
 *   post:
 *     summary: Approve a joke
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []  # Require Bearer token for this route
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the joke to approve
 *     responses:
 *       200:
 *         description: Joke approved
 *       404:
 *         description: Joke not found
 */
router.post('/:id/approve', authMiddleware, approveJoke);

/**
 * @swagger
 * /jokes/{id}/reject:
 *   post:
 *     summary: Reject a joke
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []  # Require Bearer token for this route
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the joke to reject
 *     responses:
 *       200:
 *         description: Joke rejected
 *       404:
 *         description: Joke not found
 */
router.post('/:id/reject', authMiddleware, rejectJoke);

module.exports = router;
