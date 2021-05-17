import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from "../utils/utils";

const AddPlacePopup = (props) => {
  const { handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const nameRef = React.useRef();
  const imageRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: imageRef.current.value,
    }, resetUserData);
  };

  const resetUserData = () => {
    nameRef.current.value='';
    imageRef.current.value='';
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      isOpen={props.isOpen}
      isValid={isValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <fieldset className="form__fieldset">
        <input
          ref={nameRef}
          className={`form__input ${errors.name && "form__input_error"}`}
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          onChange={handleChange}
        />
        <p className={`form__error ${errors.name && "form__error_visible"}`}>
          {errors.name}
        </p>
        <input
          ref={imageRef}
          className={`form__input ${errors.link && "form__input_error"}`}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          onChange={handleChange}
        />
        <p className={`form__error ${errors.link && "form__error_visible"}`}>
          {errors.link}
        </p>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;