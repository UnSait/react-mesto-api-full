import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({isOpen, onClose, addCard}) {

  const [name, setName] = React.useState('');
  const [link, setlink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setlink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    addCard({
      name: name,
      link: link
    });
  }

  return(
    <PopupWithForm name="addCard" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Новое место" buttonText="Создать">
      <input value={name} onChange={handleNameChange} id="nameCard-input" className="popup__input popup__input_type_nameCard" name="input-nameCard" type="text" placeholder="Название" minLength="2" maxLength="40" required/>
      <span className="nameCard-input-error popup__input-text-error"></span>
      <input value={link} onChange={handleLinkChange} id="url-input" className="popup__input popup__input_type_photoCard" name="input-cardPlace" type="url" placeholder="Ссылка на картинку" required/>
      <span className="url-input-error popup__input-text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
