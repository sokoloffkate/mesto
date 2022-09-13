import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popUpSelector, popupConfig, viewImagConfig) {
    super(popUpSelector, popupConfig);
    this._img = viewImagConfig.imgSelector;
    this._imgTitle = viewImagConfig.imgTitleSelector;
    this._imgElement = document.querySelector(`.${this._img}`);
    this._imgTitleElement = document.querySelector(`.${this._imgTitle}`);
    this.open = this.open.bind(this);
  }

  open ({link, name}) {
    //console.dir({name, link})
    this._imgElement.src = link;
    this._imgElement.alt = name;
    this._imgTitleElement.textContent = name;
    super.open(); 
    
  }
} 