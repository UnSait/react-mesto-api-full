import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} titleClass="popup__form-question" title="Обновить аватар" buttonText="Сохранить" >
      <input ref={avatarRef} id="urlAvatar-input" className="popup__input popup__input_type_link-avatar" name="input-linkAvatar" type="url" placeholder="Ссылка на фотографию" required/>.
      <span className="urlAvatar-input-error popup__input-text-error "></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
