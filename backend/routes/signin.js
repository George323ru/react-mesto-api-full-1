const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const MineError = require('../errors/mine-error');
const { login } = require('../controllers/user');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use('*', (req, res, next) => next(new MineError('Ресурс не найден', 404)));

module.exports = router;
