export class Popup {
  constructor (popUpSelector, popupConfig) {
    this._aciveModifier = popupConfig.aciveModifier;
    this._closeBtnSelector = popupConfig.closeBtnSelector;
    this._popup = document.querySelector(popUpSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
   } 
  
 _handleBtnClose = () => {
  this.close();
}

 _handleEscClose = (evt) => {
  if(evt.key === 'Escape') {
    this.close(); 
  }
}

_handleCloseOverlay = (evt) => {
  if(evt.target === evt.currentTarget) {
    this.close();
  }
}

open() { 
  this._popup.classList.add(`${this._aciveModifier}`);
  document.addEventListener('keydown', this._handleEscClose);
  this._popup.addEventListener('mousedown', this._handleCloseOverlay);
}; 

close() {
  this._popup.classList.remove(`${this._aciveModifier}`);
  document.removeEventListener('keydown', this._handleEscClose);
  this._popup.removeEventListener('mousedown', this._handleCloseOverlay);
}; 

 setEventListeners() {
  this._closeBtn = this._popup.querySelector(`.${this._closeBtnSelector}`);
  this._closeBtn.addEventListener('click', this._handleBtnClose);
  }
 }
