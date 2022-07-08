export class Card {
  constructor ({name, link}, cardSelector, openImage) {
  this._name = name;
  this._link = link;
  this._cardSelector = cardSelector;
  this._openImage = openImage;
} 

_getTemplate() {
  const newCard = document
  .querySelector(this._cardSelector)
  .content
  .querySelector('.elements-grid__element')
  .cloneNode(true);

  return newCard;  
}

createCard() {

// Запишем разметку в приватное поле _element. 
// Так у других элементов появится доступ к ней.   
 this._element = this._getTemplate();
 
 this._like = this._element.querySelector('.elements-grid__icon');
 this._trashButton = this._element.querySelector('.elements-grid__trash'); 
 this._image = this._element.querySelector('.elements-grid__image');
 this._image.src = this._link;
 this._image.alt = this._name;
 this._element.querySelector('.elements-grid__title').textContent = this._name;
  
 this._setEventListeners();
  
// Вернём элемент наружу
 return this._element;
}

//Удаление карточки
_removeCard = () => {
 this._element.remove(); 
 this._element = null;
}

// Переключениe кнопки like 
_likeHandle = () => { 
this._like.classList.toggle('elements-grid__icon_active');
}  

//Открыть popup c картинкой
_handleImgClik = () => {
  this._openImage({link: this._link, name: this._name});
}

_setEventListeners() {
this._trashButton.addEventListener('click', this._removeCard);
this._like.addEventListener('click', this._likeHandle);
this._image.addEventListener('click', this._handleImgClik);
}
};
