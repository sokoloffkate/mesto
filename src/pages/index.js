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
  
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator, validConfig} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

Array.from(document.forms).forEach((formElement) => {
  validatorForms[formElement.name] = new FormValidator(validConfig, formElement);
  validatorForms[formElement.name].enableValidation();
   }
 );
console.log(validatorForms[popUpAddForm.name]);
const viewPopup = new PopupWithImage(popUpZoomInImg, popupConfiguration, viewImagConfiguration);
viewPopup.setEventListeners();

//Функция создание карточки 
const createCard = ({name: name, link: link}) =>
 {
  const newCard = new Card ({name: name, link: link}, '#card-template', viewPopup.open);
  const cardElement = newCard.createCard();
  renderCards.addItem(cardElement);
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

//Добавление новой карточки через форму 
const newCardPopup = new PopupWithForm (
  popUpAdd, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpAddForm.name].deleteInputErrors,
  createCard
  );
newCardPopup.setEventListeners()

const user = new UserInfo(profileConfiguraton);
user.setUserInfo({name: 'Жак-Ив Кусто', job: 'Исследователь океана'});

//Обновить данные профиля
function updateProfile (data) {
  user.setUserInfo(data) ;
}; 

const profilePopup = new PopupWithForm (
  popUpEdit, 
  popupConfiguration, 
  formConfiguration, 
  validatorForms[popUpEditForm.name].deleteInputErrors,
  updateProfile
  );
profilePopup.setEventListeners();  

const handleEditFormOpen = () => {
  profilePopup.open();
}

popUpEditBut.addEventListener('click', handleEditFormOpen); 

//Функция неактивной кнопки
/*const disabledButton = (button) => {
  button.classList.add("popup__button_inactive");
  button.disabled = true;
};*/

// Открыть popup на добавление новой карточки
popUpAddBut.addEventListener('click', function(evt) {
 // disabledButton(PopUpSubmitButton);
  //openPopUp(popUpAdd);
  newCardPopup.open();
});






