import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <div className="page__row page__section">
        <section className="profile page__profile">
          <button onClick={props.onEditAvatar} className="profile__avatar" type="button" style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
          <div className="profile__info">
              <div className="profile__row">
                <h1 className="profile__title profile__item profile__item_el_name">{currentUser.name}</h1>
                <button onClick={props.onEditProfile} className="button button_action_edit profile__button-edit" type="button"></button>
              </div>
            <p className="profile__subtitle profile__item profile__item_el_job">{currentUser.about}</p>
          </div>
        </section>
      
        <button onClick={props.onAddPlace} className="button button_action_add page__button-add" type="button"></button>
      </div>

      <section className="page__section">
        <ul className="cards" id="test">{
          props.cards.map((card) => (
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete} 
            />
          ))
        }</ul>
      </section>
    </main>
  )
}

export default Main;