const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/Errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
