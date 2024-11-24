const axios = require('axios');

const SUBMIT_JOKES_URL = process.env.SUBMIT_JOKES_URL;
const DELIVER_JOKES_URL = process.env.DELIVER_JOKES_URL;

// Fetch a new joke from Submit Jokes Service
exports.getNextJoke = async (req, res) => {
  try {
    const response = await axios.get(`${SUBMIT_JOKES_URL}/jokes/pending`);
    const jokes = response.data;

    if (jokes.length === 0) {
      return res.status(404).json({ message: 'No jokes available for moderation.' });
    }

    res.status(200).json(jokes[0]); // Return the first pending joke
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jokes from Submit Jokes Service', error });
  }
};

// Approve and send joke to Deliver Jokes Service
exports.approveJoke = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.post(`${DELIVER_JOKES_URL}/jokes`, req.body);

    // Remove the joke from Submit Jokes Service
    await axios.delete(`${SUBMIT_JOKES_URL}/jokes/${id}`);

    res.status(200).json({ message: 'Joke approved and delivered', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Error approving joke', error });
  }
};

// Reject and delete joke from Submit Jokes Service
exports.rejectJoke = async (req, res) => {
  const { id } = req.params;

  try {
    await axios.delete(`${SUBMIT_JOKES_URL}/jokes/${id}`);
    res.status(200).json({ message: 'Joke rejected and deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting joke', error });
  }
};
