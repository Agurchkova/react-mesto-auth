import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationDltPopup from './ConfirmationDltPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDltPopupOpen, setIsConfirmationDltPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: '' });
  const navigate = useNavigate();

  const [isRegSuccessful, setIsRegSuccessful] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, card]) => {
          setCurrentUser(userData);
          setCards(card);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationDltPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  const isOpen = isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    isConfirmationDltPopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closePopupByEsc);
      return () => {
        document.removeEventListener('keydown', closePopupByEsc);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    function closeByClickOnOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('mousedown', closeByClickOnOverlay);
      return () => {
        document.removeEventListener('mousedown', closeByClickOnOverlay);
      }
    }
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(itemId) {
    setIsLoading(true);
    api.deleteItem(itemId).then(() => {
      setCards((cards) => cards.filter((card) => card._id !== itemId));
      closeAllPopups();
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserData(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true);
    api
      .changeAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addItem(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardDeleteClick(itemId) {
    setIsConfirmationDltPopupOpen(!isConfirmationDltPopupOpen);
    setDeletedItemId(itemId);
  };

  // Регистрация и Авторизация профиля
  const handleRegisterSignUp = (data) => {
    return auth
      .registerSignUp(data)
      .then(() => {
        setIsRegSuccessful(true);
        setStatusMessage({ message: "Вы успешно зарегистрировались!" })
        handleInfoTooltip();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegSuccessful(false);
        setStatusMessage({ message: "Что-то пошло не так! Попробуйте ещё раз." })
        handleInfoTooltip();
      });
  };

  const handleAuthorizeSignIn = (data) => {
    return auth
      .authorizeSignIn(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setStatusMessage({ message: "Что-то пошло не так! Попробуйте ещё раз." })
        handleInfoTooltip();
      });
  };

  // Проверка токена
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth.getContent(jwt)
      .then((data) => {
        setAuthEmail(data.data.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn]);

  // Выход
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={authEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path="/sign-in"
            element={
              <>
                <Login onLogin={handleAuthorizeSignIn} />
              </>
            } />
          <Route path="/sign-up"
            element={
              <>
                <Register onRegister={handleRegisterSignUp} />
              </>
            } />
          <Route path="/"
            element={
              <>
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  onEditProfile={() => setIsEditProfilePopupOpen(true)}
                  onAddPlace={() => setIsAddPlacePopupOpen(true)}
                  onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleCardDeleteClick}
                  cards={cards}
                />
              </>
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmationDltPopup
          isOpen={isConfirmationDltPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={deletedItemId}
          onLoading={isLoading}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegSuccessful}
          statusMessage={statusMessage}
        />
      </div>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;