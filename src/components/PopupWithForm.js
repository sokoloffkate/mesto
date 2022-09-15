import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popUpSelector, popupConfig, formConfig, validRecetCallBack, submitCallBack, getInputCallback = null) {
    super(popUpSelector,popupConfig);
    this._formSelector = formConfig.formSelector;
    this._inputFormSelector = formConfig.inputFormSelector;
    this._submitBtnSelector = formConfig.submitBtnSelector;
    this._submitCallBack = submitCallBack;
    this._validRecetCallBack = validRecetCallBack;
    this._getInputCallback = getInputCallback;
    this._form = this._popup.querySelector(`.${this._formSelector}`);
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputFormSelector}`));
  }  

  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach((input) => 
    { 
       this._formValues[input.name.slice(6)] = input.value 
     });
     
    return this._formValues; 
 }

 _setInputValues (formValues) {
  this._inputList.forEach((input) => 
   { 
      input.value = formValues[[input.name.slice(6)]];
    })
   }
  
 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {;
    evt.preventDefault();
    this._submitCallBack(this._getInputValues());
    this.close();
  })
 }

 open() {

  if (this._getInputCallback) {
  this._setInputValues(this._getInputCallback());   
  } else {
   this._form.reset();
   }
  super.open();
   this._validRecetCallBack();
 }

 close() {
  super.close();
  this._form.reset();
 }
  }


