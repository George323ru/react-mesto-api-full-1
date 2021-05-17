import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import { createApi } from "../utils/api";
import { CurrentEmailContext } from "../contexts/CurrentEmailContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LoadingFormContext } from "../contexts/LoadingFormContext";
import initialAvatar from "../images/avatar.svg";

const App = () => {
  const history = useHistory();

  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [api, setApi] = React.useState({});

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [infoText, setInfoText] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState();
  const [deleteCard, setDeleteCard] = React.useState();

  const [currentEmail, setCurrentEmail] = React.useState("email");
  const [currentUser, setCurrentUser] = React.useState({
    name: "Имя",
    about: "О себе",
    avatar: initialAvatar,
  });

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard();
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleAddPlaceSubmit = (card, resetData) => {
    setIsLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        resetData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setDeleteCard(card);
    setIsDeleteCardPopupOpen(true);
  };

  const handleCardDeleteSubmit = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setDeleteCard();
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard._id ? newCard : c))
        );
      });
  };
  
  const handleCheckToken = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentEmail(res.email);
            setIsLoggedIn(true);
            updateContent(jwt);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  
  const handleErrorOnAuth = () => {
    setInfoText("Что-то пошло не так! Попробуйте ещё раз.");
    setIsInfoTooltipSuccess(false);
    setIsInfoTooltipOpen(true);
  };

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        handleCheckToken();
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        handleErrorOnAuth();
      });
  };

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        history.push("/sign-in");
        setInfoText("Вы успешно зарегистрировались!");
        setIsInfoTooltipSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.log(error);
        handleErrorOnAuth();
      });
  };
  
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  const handleUpdateAvatar = (image) => {
    updateUserFromApi(api.changeAvatar(image));
  };

  const handleUpdateUser = (data) => {
    updateUserFromApi(api.changeUserInfo(data));
  };

  const updateUserFromApi = (prom) => {
    setIsLoading(true);
    prom
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateContent = (token) => {
    const newApi = createApi(token);
    setApi(newApi);
    Promise.all([newApi.getUserInfo(), newApi.getInitialCards()])
      .then(([userData, dataCards]) => {
        setCurrentUser(userData);
        setCards(dataCards.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    isloggedIn && history.push("/");
  }, [isloggedIn]);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentEmailContext.Provider value={currentEmail}>
            <Header onSignOut={handleSignOut} />
          </CurrentEmailContext.Provider>

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isloggedIn={isloggedIn}
              component={Main}
              cards={cards}
              //onMain={updateContent}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin}/>
            </Route>
            <Route path="*">
              <div className="page__section">
                <h1>404 - Страница не найдена</h1>
                <p>Здесь ничего нет</p>
              </div>
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isInfoTooltipSuccess}
            text={infoText}
            onClose={closeAllPopups}
          />

          <Footer />

          <LoadingFormContext.Provider value={isLoading}>
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <DeleteCardPopup
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleCardDeleteSubmit}
              card={deleteCard}
            />
          </LoadingFormContext.Provider>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
