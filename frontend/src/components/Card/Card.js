import trash from '../../image/Trash.svg';
import React from 'react';
import CurrentUserContext from '../../Context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardDeleteButtonClassName = isOwn ? "" : "elements__element-trash_hidden";
  const cardLikeButtonClassName = isLiked ? "elements__element-button_active" : "";

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  return(
      <li className="elements__element-group">
        <img className={`elements__element-trash ${cardDeleteButtonClassName}`} onClick={handleDeleteClick} src={trash} alt="Удалить"/>
        <div className="elements__element-photo-container">
          <img className="elements__element-photo" onClick={handleClick} src={card.link} alt={card.name}/>
        </div>
        <div className="elements__element-info">
          <h2 className="elements__element-name">{card.name}</h2>
          <div className="elements__element-like-section">
            <button className={`elements__element-button ${cardLikeButtonClassName}`} onClick={handleLikeClick} type="button"></button>
            <p className="elements__element-like-count">{card.likes.length}</p>
          </div>
        </div>
      </li>
  )
}

export default Card;
