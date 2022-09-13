export const initialCards = [
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

  export const validatorForms = {};

  export const cardGrid = document.querySelector('.elements-grid');
  export const popUpAddBut = document.querySelector('.profile__add-button');
  export const popUpEditBut = document.querySelector('.profile__edit-button');
  export const popUpAddForm = document.querySelector('.popup__form_add_card');
  export const popUpEditForm = document.querySelector('.popup__form_edit_card');
  
  export const popUpAdd = 'popup_add_card';
  export const popUpEdit = 'popup_edit_profile';
  export const popUpZoomInImg = 'popup_zoom-in_image';
  
  export const formConfiguration = {
    formSelector: 'popup__form',
    inputFormSelector: 'popup__field',
    submitBtnSelector: 'popup__button',
  }

  export const popupConfiguration = {
    aciveModifier: 'popup_opened',
    closeBtnSelector: 'popup__close-button',
  }

  export const profileConfiguraton = {
    nameSelector: 'profile__title',
    jobSelector: 'profile__subtitle',
  }

  export const viewImagConfiguration = {
   imgSelector: 'popup__image',
   imgTitleSelector: 'popup__image-title',
  }