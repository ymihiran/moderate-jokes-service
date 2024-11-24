const Joke = require('../models/joke.model');

exports.getPendingJokes = async (req, res) => {
  try {
    const jokes = await Joke.find({ status: 'pending' });
    res.status(200).json(jokes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending jokes' });
  }
};

exports.approveJoke = async (req, res) => {
  try {
    const joke = await Joke.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!joke) return res.status(404).json({ message: 'Joke not found' });
    res.status(200).json(joke);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve joke' });
  }
};

exports.rejectJoke = async (req, res) => {
  try {
    const joke = await Joke.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!joke) return res.status(404).json({ message: 'Joke not found' });
    res.status(200).json(joke);
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject joke' });
  }
};
