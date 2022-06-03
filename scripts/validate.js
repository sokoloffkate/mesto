const config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__field_error-red-line',
  errorClass: 'popup__field-error'
}

/*const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__field');
const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`)
console.log(errorClass);*/

/*enableValidation({
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__field_error-red-line',
  errorClass: 'popup__field-error' 
  });*/

  //Показывает элемент ошибки
  const showError = (form, input, errorMessage) => {
   input.classList.add('popup__field_error-red-line'); 
   const errorElement = form.querySelector(`.${input.id}-error`);
   errorElement.textContent = errorMessage;
   console.log(errorElement);
 };

  //Скрывает элемент ошибки
  const hideError = (form, input) => {
   input.classList.remove('popup__field_error-red-line');   
   const errorElement = form.querySelector(`.${input.id}-error`);
   errorElement.textContent = " ";
 };

  //Проверка валидности полей формы
  const inValid = (form, input) => {
   if(!input.validity.valid) {
    showError(form, input, input.validationMessage);  
  }else{
    hideError(form, input);
   } 
 };

  const setEventListeners = form => {
   const inputList = Array.from(form.querySelectorAll('.popup__field'));
   const button = form.querySelector('.popup__button');
    toggleButtonState(inputList, button); 

   inputList.forEach((input ) => {
    input.addEventListener('input', function() {
     inValid(form, input); 
     toggleButtonState(inputList, button); 
    });});
 };

  const hasInvalidField = inputList => {
   return inputList.some((input) => {
    return !input.validity.valid;
    });     
 };

  const toggleButtonState = (inputList, button) => {
      console.log(button);
   if (hasInvalidField(inputList)) {
     button.classList.add('popup__button_inactive');    
    }else{
     button.classList.remove('popup__button_inactive');    
    }  
  };

  // Находим все формы и их поля на странице
  const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll('.popup__form'));
   formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
     evt.preventDefault();
    });
     setEventListeners(form);  
   });
  };
  
  enableValidation();
  
  //Проверка полей формы на ошибки и вывод сообщение об ошибк
/*const checkInputValidity = (input, form) => {
  const fieldset = input.closest('.popup__form-fieldset');
  const errorField = fieldset.querySelector('.popup__field-error');
   
  errorField.textContent = " ";
  errorField.classList.remove(errorActive);
  input.classList.remove('errorRedLine');
  
  if(!input.validity.valid) {
  errorField.textContent = input.validationMessage;
  errorField.classList.add('errorActive');
  input.classList.add('errorRedLine');
}
  setFormValidity(form);
  }
  
  //Деактивирует форму пока не станет валидной
const setFormValidity = (form) => {
  if (form.checkValidity()) {
  popUpSaveBut.classList.remove(inActiveBut);
  popUpCreateBut.classList.remove(inActiveBut);
  } else {
  popUpSaveBut.classList.add(inActiveBut);
  popUpCreateBut.classList.add(inActiveBut);
  }
  }
  
  enableValid(popUpEditForm);
  enableValid(popUpAddForm);*/
  