import React from 'react';
import { Route, Redirect, useHistory, Switch} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import CurrentUserContext from '../../Context/CurrentUserContext';

import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from "../../Utils/Auth";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import api from '../../Utils/Api';

import avatar from '../../image/kusto.jpg';
import accept from '../../image/Union.png';
import rejection from '../../image/Union2.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipAccept, setisInfoTooltipAccept] = React.useState(false);
  const [isInfoTooltipRejection, setisInfoTooltipRejection] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [currentUser, setCurrentUser] = React.useState({name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar});
  const [userMail, setUserMail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [token, setToken] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    handleSignInProfileToken();
  }, [])

  React.useEffect(() => {
    handleSignInProfileToken()
    Promise.all([api.getProfile(token), api.getInitialCards(token)])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch(err => console.log("Не удалось загрузить:", err));
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipAccept() {
    setisInfoTooltipAccept(true);
  }

  function handleInfoTooltipRejection() {
    setisInfoTooltipRejection(true);
  }

  function handleCloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisInfoTooltipAccept(false);
    setisInfoTooltipRejection(false);
    setSelectedCard({ isOpen: false });
  }

  function handleUpdateUser(data, token) {
    api.editProfile(data.name, data.about, token)
    .then((res) => {
      setCurrentUser(res);
      handleCloseAllPopups();
    })
    .catch(err => console.log("Не удалось выполнить:", err));
  }

  function handleUpdateAvatar({avatar, token}) {
    console.log(avatar, token)
    api.getAvatar(avatar, token)
    .then((res) => {
      setCurrentUser(res);
      handleCloseAllPopups();
    })
    .catch(err => console.log("Не удалось выполнить:", err));
  }

  function handleAddPlaceSubmit({name, link, token}) {
    api.addCard(name, link, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      handleCloseAllPopups();
    })
    .catch(err => console.log("Не удалось выполнить:", err));
  }

  function handleCardLike(card, token) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked, token)
    .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log("Не удалось выполнить:", err))
  }

  function handleCardDelete(card, token) {
    api.deleteCard(card._id, token)
    .then(() => {
      setCards(cards.filter(c => c._id !== card._id));
    })
    .catch(err => console.log("Не удалось выполнить:", err));
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      ...card
    })
  }

  function handleRegisterProfile({password, email}) {
    auth.register({password, email})
    .then(() => {
      handleInfoTooltipAccept();
      history.push("/signin")
    })
    .catch((err) => {
      console.log("Не удалось выполнить:", err);
      handleInfoTooltipRejection();
    });
  }

  function handleLoginProfile({password, email}) {
    auth.authorize({password, email})
    .then((res) => {
      localStorage.setItem('jwt', JSON.stringify(res.token));
      setToken(res.token);
      setUserMail(email);
      setLoggedIn(true);
      history.push("/profile");
    })
    .catch((err) => {
      console.log("Не удалось выполнить:", err);
    });
  }

  function handleSignInProfileToken() {
    if (localStorage.getItem("jwt")) {
      const token = JSON.parse(localStorage.getItem("jwt"));
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setToken(token);
          history.push("/profile");
          setUserMail(res.data.email);
        })
        .catch(() => {
          console.log("Необходимо авторизоваться")
        });
    }
  }

  function handleSignOutProfile() {
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    setToken('');
    history.push('/signin')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>


      <div className="App">

        <div className="page">
        <Switch>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header mail={userMail} authStatus="Выйти" redirect={handleSignOutProfile} />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} />
          </ProtectedRoute>


          <Route path="/signin">
            <Header authStatus="Регистрация" redirect={() => {history.push("/signup")}} />
            <Login onLogin={handleLoginProfile} />
          </Route>

          <Route path="/signup">
            <Header authStatus="Войти" redirect={() => {history.push("/signin")}} />
            <Register onRegister={handleRegisterProfile} />
          </Route>

          <Route exact path="/">
          {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopups} addCard={handleAddPlaceSubmit} />

        <PopupWithForm name="delete" titleClass="popup__form-question" title="Вы уверены?" buttonText="Да"/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={handleCloseAllPopups}/>

        <InfoTooltip isOpen={isInfoTooltipAccept} onClose={handleCloseAllPopups} info="Вы успешно зарегистрировались" icon={accept}/>

        <InfoTooltip isOpen={isInfoTooltipRejection} onClose={handleCloseAllPopups} info="Что-то пошло не так!Попробуйте ещё раз." icon={rejection}/>

      </div>



    </CurrentUserContext.Provider>
  );
}

export default App;
