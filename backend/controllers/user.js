const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const MineError = require('../errors/mine-error');

const ERROR_FOUND = 'Запрашиваемый пользователь не найден';

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const userWithoutPass = Object.assign(user, { password: undefined });
      res.send(userWithoutPass);
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      } else if (error.name === 'MongoError' && error.code === 11000) {
        next(new MineError('Пользователь с такой почтой уже есть', 409));
      }
      next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => new MineError('Неправильные почта или пароль', 401))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new MineError('Неправильные почта или пароль', 401);
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        res.send({ token });
      }))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};
