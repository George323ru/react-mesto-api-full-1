import imageSuccess from '../images/info-success.svg';
import imageError from '../images/info-error.svg';
import { useEffect } from 'react';

const InfoTooltip = (props) => {

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
  return (
    <div onClick={closePopup} className={`popup popup_type_info ${ (props.isOpen) ? "popup_opened" : ""}`}>
      <div className="info">
        <img className="info__image" src={props.isSuccess ? imageSuccess: imageError} alt={props.isSuccess ? "Success" : "Error"}/> 
        <p className="info__text">{props.text}</p>
        <button onClick={props.onClose} className="button button_action_close popup__button-close popup__button-close_form-mobile_center" type="button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;