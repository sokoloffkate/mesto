import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popUpSelector, popupConfig) {
    super(popUpSelector, popupConfig)
    this._submitBtn = this._popup.querySelector('.popup__button');
 }

 handleSubmit = (submitAction) => {
     this._submitHandler = submitAction;
 }

 setEventListeners() {
 super.setEventListeners();
 this._submitBtn.addEventListener('click', (evt) => {;
    evt.preventDefault();
    this._submitHandler();
    super.close();
  })
}

}