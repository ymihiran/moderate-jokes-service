const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Joke', jokeSchema);
