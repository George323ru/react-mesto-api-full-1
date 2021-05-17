import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onSubmit(props.card);
  };

  return (
    <PopupWithForm 
      name="deleteCard" 
      title="Вы уверены?"
      submitTitle = "Да" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}

export default AddPlacePopup;