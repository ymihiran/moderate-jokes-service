
const axios = require('axios');


exports.getPendingJokes = async (req, res) => {
  try {
    console.log(SUBMIT_JOKES_URL);
    const response = await axios.get(`${process.env.SUBMIT_JOKES_URL}/jokes/pending`);
    const jokes = response.data;

    if (jokes.length === 0) {
      return res.status(404).json({ message: 'No pending jokes available' });
    }

    res.status(200).json(jokes); 
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching pending jokes', error: err });
  }
};

// Approve a joke and send it to the Deliver Jokes Service
exports.approveJoke = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Fetch the joke by ID 
    const jokeResponse = await axios.get(`${process.env.SUBMIT_JOKES_URL}/jokes/${id}`);
    const joke = jokeResponse.data;

    // Send approved joke to the Deliver Jokes Service
    const deliveryResponse = await axios.post(`${process.env.DELIVER_JOKES_URL}/jokes`, joke);

    // Delete joke from Submit Jokes Service after approval
    await axios.delete(`${process.env.SUBMIT_JOKES_URL}/jokes/${id}`);

    res.status(200).json({ message: 'Joke approved and delivered', joke: deliveryResponse.data });
  } catch (err) {
    res.status(500).json({ message: 'Error approving joke', error: err });
  }
};

// Reject a joke and delete it from Submit Jokes Service
exports.rejectJoke = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete joke from Submit Jokes Service
    await axios.delete(`${process.env.SUBMIT_JOKES_URL}/jokes/${id}`);

    res.status(200).json({ message: 'Joke rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting joke', error: err });
  }
};
