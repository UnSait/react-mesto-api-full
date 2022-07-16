import React from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../Context/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, handleCardLike, handleCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const {name, about, avatar} = currentUser;

  return (
  <main className="main">

    <section className="profile">
      <div className="profile__menu">
        <div className="profile__avatar-container">
          <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
          <img className="profile__avatar" src={avatar} alt="аватар"/>
        </div>
        <div className="profile__info-container">
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <p className="profile__status">{about}</p>
          </div>
        <button className="profile__edit-button" type="button" onClick={onEditProfile}>
        </button>
        </div>
      </div>
      <button className="profile__add-button" type="button" onClick={onAddPlace}>
      </button>
    </section>

    <section className="elements">
      <ul className="list elements__element">
      {
        cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={card._id}/>
        ))
      }
      </ul>
    </section>

  </main>

  );
}

export default Main;
