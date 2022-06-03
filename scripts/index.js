const cardGrid = document.querySelector('.elements-grid');
const cardTemplate = document.querySelector('#card-template').content;
const popUpAddForm = document.querySelector('.popup__form_add_card');
const popUps = document.querySelectorAll('.popup');
const popUpEditBut = document.querySelector('.profile__edit-button');
const popUpEdit = document.querySelector('.popup_edit_profile');
const popUpAddBut = document.querySelector('.profile__add-button');
const popUpAdd = document.querySelector('.popup_add_card');
const popUpZoomInImg = document.querySelector('.popup_zoom-in_image');
const popUpImg = popUpZoomInImg.querySelector('.popup__image');
const popUpTitle = popUpZoomInImg.querySelector('.popup__image-title');
const popUpCloseButs = document.querySelectorAll('.popup__close-button');
const popUpEditForm = document.querySelector('.popup__form_edit_card');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popUpEditForm.querySelector('.popup__field_type_name');
const inputJob = popUpEditForm.querySelector('.popup__field_type_job');
const placeName = popUpAddForm.querySelector('.popup__field_place_name');
const placeLink = popUpAddForm.querySelector('.popup__field_place_link');

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

// Переключениe кнопки like 
const likeHandle = evt => { 
evt.target.classList.toggle('elements-grid__icon_active');
}

//Удаление карточки
const removeCard = evt => {
  evt.target.closest('.elements-grid__element').remove();
}

//Редактировать профиль
function insertNameJob() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

 popUpEditBut.addEventListener('click', function(evt) {
  openPopUp(popUpEdit);
  insertNameJob();
}
);

 //Функция открытия popup
const openPopUp = (popup) => {
  popup.classList.add('popup_opened');
}

//Функция закрытия popup
const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
}

// Открыть popup на добавление новой карточки
popUpAddBut.addEventListener('click', function(evt) {
  openPopUp(popUpAdd);
});

//Обновить данные профиля
function updateProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopUp(popUpEdit);
}  
popUpEditForm.addEventListener('submit', updateProfile);

//Открыть popup c картинкой
const popUpOpenImg = evt => {
  openPopUp(popUpZoomInImg);
  popUpImg.src = evt.target.src;
  popUpImg.alt = evt.target.alt;
  popUpTitle.textContent = evt.target.alt;
 }

//Создание карточек 
const createCard = ({name, link}) => {
  const newCard = cardTemplate.querySelector('.elements-grid__element').cloneNode(true);
  const cardImage = newCard.querySelector('.elements-grid__image');
  const cardTitle = newCard.querySelector('.elements-grid__title');
  const remove = newCard.querySelector('.elements-grid__trash');
  const like = newCard.querySelector('.elements-grid__icon');
  like.addEventListener('click', likeHandle);
  remove.addEventListener('click', removeCard);
  cardImage.addEventListener('click', popUpOpenImg);
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `${name}`;
  return newCard;
}

//Отображение карточки
const addCard = card => {
  cardGrid.prepend(card);
}

//Добавить новую карточку
const addNewCard = evt => {
  evt.preventDefault();
  const makeCard = createCard({name: placeName.value, link: placeLink.value});
  addCard(makeCard);
  evt.target.reset();
  closePopUp(popUpAdd);
}
popUpAddForm.addEventListener('submit', addNewCard);
  
//Отображение карточек из массива
initialCards.forEach(el => {
  const makeCard = createCard (el);
  addCard(makeCard);
});

//Закрывает всплывающие окна
for (let i=0; i<popUps.length;i++){
  popUps[i].addEventListener('click', function (evt) {
  const evtTarget = evt.target;
  if (evtTarget === popUpCloseButs[i]){
  closePopUp(popUps[i]);}
   });
  }



