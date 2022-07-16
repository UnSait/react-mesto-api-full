import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../Context/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return(
    <PopupWithForm name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Редактировать профиль" buttonText="Сохранить">
      <input value={name} onChange={handleNameChange} id="name-input" className="popup__input popup__input_type_name" name="input-name" type="text" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required/>
      <span className="name-input-error popup__input-text-error"></span>
      <input value={description} onChange={handleDescriptionChange} id="status-input" className="popup__input popup__input_type_stasus" name="input-status" type="text" placeholder="Исследователь океана" minLength="2" maxLength="200" required/>
      <span className="status-input-error popup__input-text-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
