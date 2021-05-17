import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../utils/utils";

const EditProfilePopup = (props) => {
  const { values, setValues, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  useEffect(() => {
    setValues( {...values, name: currentUser.name, description: currentUser.about});
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      isValid={isValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <fieldset className="form__fieldset">
        <input
          className={`form__input ${errors.name && "form__input_error"}`}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <p className={`form__error ${errors.name && "form__error_visible"}`}>
          {errors.name}
        </p>
        <input
          className={`form__input ${errors.description && "form__input_error"}`}
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
        />
        <p className={`form__error ${errors.description && "form__error_visible"}`}>
          {errors.description}
        </p>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
