const popupOpenBut = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBut = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let inputName = form.querySelector('.popup_name');
let inputJob = form.querySelector('.popup_job');

function openPopup() {
 popup.classList.add('popup_opened');
 inputName.value = profileName.textContent;
 inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}  

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}  

popupOpenBut.addEventListener('click', openPopup);
popupCloseBut.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);