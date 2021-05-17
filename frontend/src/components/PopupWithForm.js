import React, { useEffect } from "react";
import { LoadingFormContext } from "../contexts/LoadingFormContext";

const PopupWithForm = (props) => {

  const isLoading = React.useContext(LoadingFormContext);

  const submitRef = React.useRef();

  const closePopup = (evt) => {
    if (evt.target.classList.contains("popup")) {
      props.onClose();
    }
  };

  useEffect(() => {
    const renderLoading = (isLoading) => {
      if (isLoading) {
        submitRef.current.textContent = "Загрузка...";
      } else {
        submitRef.current.textContent = props.submitTitle || "Сохранить";
      }
    };

    renderLoading(isLoading);
  }, [isLoading, props.submitTitle]);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        props.onClose();
      }
    };
    
    document.addEventListener("keyup", handleEscClose);

    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  });

  useEffect(() => {
    if (props.onReset) {
      props.onReset();
    }
  }, [props.isOpen]);

  return (
    <div
      onClick={closePopup}
      className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <form
        onSubmit={props.onSubmit}
        className="form form_mobile_large"
        name={`${props.name}`}
        noValidate
      >
        <h2 className="form__title"> 
          {`${props.title}`}
        </h2>
        {props.children}
        <button
          ref={submitRef}
          className={`form__button-submit popup__button`}
          type="submit"
          disabled={!props.isValid}
        >
          {props.submitTitle || "Сохранить"}
        </button>
        <button
          onClick={props.onClose}
          className="button button_action_close popup__button-close"
          type="button"
        ></button>
      </form>
    </div>
  );
};

export default PopupWithForm;
