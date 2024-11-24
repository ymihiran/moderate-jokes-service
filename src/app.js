const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jokeRoutes = require('./routes/jokes.routes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/jokes', jokeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Moderate Jokes Service running on port ${PORT}`));
