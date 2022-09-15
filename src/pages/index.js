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
  
} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

Array.from(document.forms).forEach((formElement) => {
  validatorForms[formElement.name] = new FormValidator(validConfig, formElement);
  validatorForms[formElement.name].enableValidation();
   }
 );

const viewPopup = new PopupWithImage(popUpZoomInImg, popupConfiguration, viewImagConfiguration);
viewPopup.setEventListeners();

//Функция создание карточки 
const createCard = ({name: name, link: link}) =>
 {
  const newCard = new Card ({name: name, link: link}, '#card-template', viewPopup.open);
  return newCard.createCard();
};

//Добавление карточек из массива через класс Section 
const renderCards = new Section (
  {
   items: initialCards.reverse(),
   renderer: createCard, 
  }, 
   cardGrid
  );
renderCards.renderItems();

const handleCardSubmit = (item) => {
  renderCards.addItem(item);
}

//Добавление новой карточки через форму 
const newCardPopup = new PopupWithForm (
  popUpAdd, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpAddForm.name].deleteInputErrors,
  handleCardSubmit
  );
newCardPopup.setEventListeners();

const user = new UserInfo(profileConfiguraton);

//Обновить данные профиля
function updateProfile (data) {
  user.setUserInfo(data) ;
}; 

const profilePopup = new PopupWithForm (
  popUpEdit, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpEditForm.name].deleteInputErrors,
  updateProfile,
  user.getUserInfo
  );
 
profilePopup.setEventListeners();  

const handleEditFormOpen = () => {
  profilePopup.open();
}

popUpEditBut.addEventListener('click', handleEditFormOpen); 

// Открыть popup на добавление новой карточки
popUpAddBut.addEventListener('click', function() {
   
  newCardPopup.open();
});






