import {Card} from './Card.js'
import {FormValidator, validConfig} from './FormValidator.js';

const cardGrid = document.querySelector('.elements-grid');
const popUpAddForm = document.querySelector('.popup__form_add_card');
const popUps = Array.from(document.querySelectorAll('.popup'));
const popUpEditBut = document.querySelector('.profile__edit-button');
const popUpEdit = document.querySelector('.popup_edit_profile');
const popUpAddBut = document.querySelector('.profile__add-button');
const popUpAdd = document.querySelector('.popup_add_card');
const popUpZoomInImg = document.querySelector('.popup_zoom-in_image');
const popUpImg = popUpZoomInImg.querySelector('.popup__image');
const popUpTitle = popUpZoomInImg.querySelector('.popup__image-title');
const popUpCloseButs = Array.from(document.querySelectorAll('.popup__close-button'));
const popUpEditForm = document.querySelector('.popup__form_edit_card');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popUpEditForm.querySelector('.popup__field_type_name');
const inputJob = popUpEditForm.querySelector('.popup__field_type_job');
const placeName = popUpAddForm.querySelector('.popup__field_place_name');
const placeLink = popUpAddForm.querySelector('.popup__field_place_link');
const PopUpSubmitButton = popUpAdd.querySelector('.popup__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Редактировать профиль
function insertNameJob() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

popUpEditBut.addEventListener('click', function(evt) {
  openPopUp(popUpEdit);
  insertNameJob();
});

//Функция, проверяющая нажата ли кнопка Esc, если нажата - закрывает попап
const pressEscHandler = (evt) => {
  if(evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened');
  closePopUp(openedPopup);  
  }; 
  /*popUps.forEach((popup) => {
  //if (popup.classList.contains('popup_opened')){
  //closePopUp(popup); }
  })};*/  
};

 //Функция открытия popup
export const openPopUp = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscHandler); 
  popup.addEventListener('mousedown', handleClickOverlay);
};

//Функция закрытия popup
const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscHandler);
  popup.removeEventListener('click', handleClickOverlay);
};

//Навешивает слушатель на форму, если пользователь кликнул за пределами формы на сайте, то закрывает ее
const handleClickOverlay = (evt) => {
  if(evt.target === evt.currentTarget) {
  closePopUp(evt.target);
  }
};


//Функция неактивной кнопки
const disabledButton = (button) => {
  button.classList.add("popup__button_inactive");
  button.disabled = true;
}

// Открыть popup на добавление новой карточки
popUpAddBut.addEventListener('click', function(evt) {
  disabledButton(PopUpSubmitButton);
  openPopUp(popUpAdd);
});

//Обновить данные профиля
function updateProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopUp(popUpEdit);
};  
popUpEditForm.addEventListener('submit', updateProfile);

//Открыть popup c картинкой
const popUpOpenImg = ({link, name}) => {
  popUpImg.src = link;
  popUpImg.alt = name;
  popUpTitle.textContent = name;
  openPopUp(popUpZoomInImg);
};

//Отображение карточки
const addCard = card => {
  cardGrid.prepend(card);
};

const createNewCard = ({name: name, link: link}, cardTempate, popUpOpenImage) => {
  const newCard = new Card ({name: name, link: link}, cardTempate, popUpOpenImage);
  const cardElement = newCard.createCard();
  addCard(cardElement);
}

//Добавить новую карточку
const addNewCard = evt => {
  evt.preventDefault();
  createNewCard ({name: placeName.value, link: placeLink.value}, '#card-template', popUpOpenImg);
  closePopUp(popUpAdd);
  evt.target.reset();
};

popUpAddForm.addEventListener('submit', addNewCard);
  
//Отображение карточек из массива
initialCards.forEach(element => {
  createNewCard({name: element.name, link: element.link}, '#card-template', popUpOpenImg);
});

//Закрывает всплывающие окна
popUps.forEach((popup, index) => {
  popup.addEventListener('click', function (evt) {
  if (evt.target === popUpCloseButs[index]){
  closePopUp(popup);
}
});
});  


const validatorForms = {};
Array.from(document.forms).forEach((formElement) => {
  validatorForms[formElement.name] = new FormValidator(validConfig, formElement);
  validatorForms[formElement.name].enableValidation();
});





