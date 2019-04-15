const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'This is the default secret...';

module.exports = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
};
