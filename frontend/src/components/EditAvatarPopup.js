import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../utils/utils";

const EditAvatarPopup = (props) => {
  const { handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  };

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      isValid={isValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <input
        className={`form__input ${errors.link && "form__input_error"}`}
        type="url"
        name="link"
        ref={avatarRef}
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        onChange={handleChange}
      />
      <p className={`form__error ${errors.link && "form__error_visible"}`}>
        {errors.link}
      </p>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
