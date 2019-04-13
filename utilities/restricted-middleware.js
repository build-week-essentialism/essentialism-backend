const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'This is the default secret...';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You must be logged in to do that.' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};
