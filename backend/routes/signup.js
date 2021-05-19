const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const MineError = require('../errors/mine-error');
const { createUser } = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?[a-z\d\.\-_~:/?#\[\]@!$&'()\*\+,;=]+/),
  }),
}), createUser);

router.use('*', (req, res, next) => next(new MineError('Ресурс не найден', 404)));

module.exports = router;
