const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
