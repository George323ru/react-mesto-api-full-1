import { useEffect } from 'react';

const ImagePopup = (props) => {

  const closePopup = (evt) => {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    };
  }
  
  useEffect( () => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') { props.onClose(); }
    };

    document.addEventListener('keyup', handleEscClose) 
    
    return () => { document.removeEventListener('keyup', handleEscClose); };
  });

  return props.card ? (
    <div
      onClick={closePopup}
      className={`popup popup_type_view-card popup_darkening_strong popup_opened`}
    >
      <div className="view-card">
        <img
          className="view-card__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="view-card__title">{props.card.name}</p>
        <button
          onClick={props.onClose}
          className="button button_action_close popup__button-close"
          type="button"
        ></button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ImagePopup;