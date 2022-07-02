export const validConfig = {
    inputSelector: 'popup__field',
    submitButtonSelector: 'popup__button',
    inactiveButtonClass: 'popup__button_inactive', 
    inputErrorClass: 'popup__field_error-red-line',
    errorClass: 'popup__field-error'
  }
  
export class FormValidator {
    constructor (config, form) {
     this._inputSelector = config.inputSelector;
     this._submitButtonSelector = config.submitButtonSelector;
     this._inactiveButtonClass = config.inactiveButtonClass;
     this._inputErrorClass = config.inputErrorClass;
     this._errorClass = config._errorClass;
     this._form = form;
    }   
  
 
  //Показывает элемент ошибки
   _showError(input, errorMessage) { 
    input.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
   }

  //Скрывает элемент ошибки
   _hideError(input) {
     input.classList.remove(this._inputErrorClass);   
     const errorElement = this._form.querySelector(`.${input.id}-error`);
     errorElement.textContent = " ";
     errorElement.classList.add(this._errorClass);
   }

   //Проверка валидности полей формы
   _inValid (input) {
    if(!input.validity.valid) {
     const errorMes = input.validationMessage;   
     this._showError(input, errorMes);  
   }else{
     this._hideError(input);
    } 
  };

   _hasInvalidField = (inputList) => {
    return inputList.some((input) => {
     return !input.validity.valid;
     });     
  };

  _toggleButtonState = (inputList, button) => {
    if (this._hasInvalidField(inputList)) { 
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;    
    } else {
      button.classList.remove(this._inactiveButtonClass); 
      button.disabled = false;   
    }  
  };

   enableValidation = () => { 
    const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    const button = this._form.querySelector(`.${this._submitButtonSelector}`);
    inputList.forEach((input) => {
     input.addEventListener('input', () => {
       this._inValid(input); 
       this._toggleButtonState(inputList, button); 
     });
    });
    
     this._toggleButtonState(inputList, button);
  };

}

    
    
    
  
    

