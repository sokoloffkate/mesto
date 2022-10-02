import './index.css';

import {
  initialCards,
  popUpAdd,
  popUpEdit,
  popUpZoomInImg,
  cardGrid,
  popUpAddForm,
  popUpEditForm,
  popUpAddBut,
  popUpEditBut,
  popupConfiguration, 
  formConfiguration,
  profileConfiguraton,
  viewImagConfiguration,
  validatorForms,
  validConfig,
  settingConfig,
  popUpConfirmDelete,
  popUpChangeAvatar,
  popUpCnangeAvatarForm,
  popUpAvatarBut,
  stateBtnConfig

} from '../utils/constants.js';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

const api = new Api ({url: settingConfig.url, headers: settingConfig.headers});

Array.from(document.forms).forEach((formElement) => {
  validatorForms[formElement.name] = new FormValidator(validConfig, formElement);
  validatorForms[formElement.name].enableValidation();
});

//Создание новой карточки
const handleCardSubmit = (data) => {
  api.addNewCard(data)
  .then((res) => {
   const card= createCard(res);
   renderCards.addItem(card);
  })
  .catch((err) => {
   console.log(`Ошибка - ${err}`);
   })
};

//Удаление карточки
const handleDeleteCard = (cardId, removeCard) => {
  deletePopup.open();
  deletePopup.handleSubmit(() => {
  api.deleteCard(cardId)
  .then (() => {
  removeCard(); 
  deletePopup.close();  
  })
  .catch((err) => {
  console.log(`Ошибка - ${err}`);
    })
  })
}

//Реализована постановка и снятие лайка
const handleCardLike = (cardId, likeStatus, setLikesCallBack) => {
  api.switchCardLikes(cardId, likeStatus)
  .then(({ likes }) => setLikesCallBack(likes))
  .catch((err) => {
  console.log(`Ошибка - ${err}`);
  })
};

//Обновить данные профиля на сервере
const updateProfile = (data, switchBtnCallBack) => {
  switchBtnCallBack(true);
  api.updateUserProfile(data)
  .then((data) => user.setUserInfo(data))
  .catch((err) => {console.log(`Ошибка - ${err}`)
  .finally(() => switchBtnCallBack(false));
  })
}; 

//Обновить аватар
const handleChangeAvatar = (data, switchBtnCallBack) => {
  switchBtnCallBack(true);
  api.changeAvatar(data)
  .then((data) => {user.setUserInfo(data)})
  .catch((err) => {console.log(`Ошибка - ${err}`)
  .finally(() => switchBtnCallBack(false));
   })
};

//Функция создание карточки 
const createCard = (item) =>
{
 const newCard = new Card (item, user.getUserId(), '#card-template', handleCardLike, viewPopup.open, handleDeleteCard);
 return newCard.createCard();
};
//Создание класса Section для создание и отрисовки карточек
const renderCards = new Section (
 { renderer: createCard }, 
  cardGrid
);
const viewPopup = new PopupWithImage(popUpZoomInImg, popupConfiguration, viewImagConfiguration);
viewPopup.setEventListeners();

const user = new UserInfo(profileConfiguraton);

const profilePopup = new PopupWithForm (
  popUpEdit, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpEditForm.name].deleteInputErrors,
  updateProfile,
  stateBtnConfig,
  user.getUserInfo
);
profilePopup.setEventListeners(); 

const newCardPopup = new PopupWithForm (
  popUpAdd, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpAddForm.name].deleteInputErrors,
  handleCardSubmit,
  stateBtnConfig
  );
newCardPopup.setEventListeners();

const deletePopup = new PopupWithSubmit(popUpConfirmDelete, popupConfiguration, stateBtnConfig);

deletePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
  popUpChangeAvatar, 
  popupConfiguration,
  formConfiguration,
  validatorForms[popUpCnangeAvatarForm.name].deleteInputErrors,
  handleChangeAvatar,
  stateBtnConfig,
  user.getUserAvatar
  );
changeAvatarPopup.setEventListeners();

const handleEditFormOpen = () => {
  profilePopup.open();
}

//Открыть popup на редактирование профиля
popUpEditBut.addEventListener('click', handleEditFormOpen);

// Открыть popup на добавление новой карточки
popUpAddBut.addEventListener('click', function() {
  newCardPopup.open();
 }
);
//Открыть popup на редактирование аватара
popUpAvatarBut.addEventListener('click', () => {
  changeAvatarPopup.open();
})

//Загрузка информации о пользователе и карточках с сервера
Promise.all([api.getUserProfile(), api.getCards()])
.then(([profile, cards]) => {
  user.setUserInfo(profile);
  renderCards.renderItems(cards)
})
.catch((err) => {
  console.log(`Ошибка - ${err}`);
});





