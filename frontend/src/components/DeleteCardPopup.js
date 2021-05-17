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
      isValid={true} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;