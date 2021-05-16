const Card = require('../models/card');
const MineError = require('../errors/mine-error');

const ERROR_FOUND = 'Запрашиваемая карточка не найдена';

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new MineError('Нет прав для удаления карточки', 403);
      }
      Card.findByIdAndRemove(cardId)
        .orFail(() => new MineError(ERROR_FOUND, 404))
        .then((deleteCard) => res.send(deleteCard));
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => new MineError(ERROR_FOUND, 404))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new MineError(`Ошибка в исходных данных: ${error.message}`, 400));
      }
      next(error);
    });
};
