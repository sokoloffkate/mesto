export class Card {
  constructor (item, ownerId, cardSelector, handleLikeCard, handleCardClick, handleDeleteClick) {
  this._name = item.name,
  this._link = item.link,
  this._likes = item.likes,
  this._cardId = item._id,
  this._userId = item.owner._id,
  this._ownerId = ownerId._id,
  this._cardSelector = cardSelector,
  this._handleLikeCard = handleLikeCard,
  this._handleCardClick = handleCardClick,
  this._handleDeleteClick = handleDeleteClick,
  this.setLikes = this._setLikes.bind(this);
  }

_getTemplate = () => {
  const newCard = document
  .querySelector(this._cardSelector)
  .content
  .querySelector('.elements-grid__element')
  .cloneNode(true);

  return newCard;  
}

createCard = () => {

// Запишем разметку в приватное поле _element. 
// Так у других элементов появится доступ к ней.   
 this._element = this._getTemplate();
 
 this._like = this._element.querySelector('.elements-grid__icon');
 this._likeCounter = this._element.querySelector('.elements-grid__likes-counter')
 this._trashButton = this._element.querySelector('.elements-grid__trash'); 
 this._image = this._element.querySelector('.elements-grid__image');
 this._image.src = this._link;
 this._image.alt = this._name;
 this._element.querySelector('.elements-grid__title').textContent = this._name;
   
 this._setEventListeners();
 this._handleTrashIcon();
 this._renderLikes();
  
// Вернём элемент наружу
 return this._element;
}

//Удаление карточки
 removeCard = () => {
 this._element.remove(); 
 this._element = null;
}

_deleteHandle = () => {
  this._handleDeleteClick(this._cardId, this.removeCard) 
}

_isLiked = () => {
return this._likes.map((user) => user._id).includes(this._ownerId);
}

_renderLikes = () => {
 if(this._isLiked()) {
  this._like.classList.add('elements-grid__icon_active');
 } else {
  this._like.classList.remove('elements-grid__icon_active');
 }
 this._likeCounter.textContent = this._likes.length;
}

_setLikes = (newLikes) => {
 this._likes = newLikes;
 this._renderLikes();
}

// Переключениe кнопки like 
_likeHandle = () => { 
  this._handleLikeCard(this._cardId, this._isLiked(), this._setLikes);
} 

//Открыть popup c картинкой
_handleImgClik = () => {
  this._handleCardClick({link: this._link, name: this._name});
}

//Проверка карточка owner, если да, то отображать корзину 
_handleTrashIcon = () => {
  if (this._userId !== this._ownerId) {
    this._trashButton.remove();
  }
}

_setEventListeners = () => {
this._trashButton.addEventListener('click', this._deleteHandle);
this._like.addEventListener('click', this._likeHandle);
this._image.addEventListener('click', this._handleImgClik);
 }
}
