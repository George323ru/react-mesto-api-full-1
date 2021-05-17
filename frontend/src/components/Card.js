import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(userId => userId === currentUser._id);

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  const handleLikeClick = (evt) => {
    evt.stopPropagation();
    props.onCardLike(props.card);
  }

  const handleDeleteClick = (evt) => {
    evt.stopPropagation();
    props.onCardDelete(props.card);
  }

  return (
    <li>
      <article onClick={handleClick} className="card">
        <figure className="card__figure">
          <div className="card__image-box">
            <div className="card__image-darkening"></div>
            <img className="card__image" src={props.card.link} alt={props.card.name}/>
          </div>
          <figcaption className="card__caption">
            <h2 className="card__title">{props.card.name}</h2>
            <div className="card__like">
              <button onClick={handleLikeClick} className={`button button-like ${isLiked && 'button-like_active'}`} type="button"></button>
              <p className="card__like-count">{props.card.likes.length}</p>
            </div>
          </figcaption>
        </figure>
        {isOwn && (
          <button onClick={handleDeleteClick} className="button button_action_delete-card" type="button"></button>
        )}
      </article>
    </li>
  );
}

export default Card;