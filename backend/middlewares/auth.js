const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const MineError = require('../errors/mine-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new MineError('Необходима авторизация', 401);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'
    );
  } catch (error) {
    throw new MineError('Необходима авторизация', 401);
  }

  req.user = payload;
  next();
};
