const config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__field_error-red-line',
  errorClass: 'popup__field-error'
}

  //Показывает элемент ошибки
  const showError = (form, input, errorMessage, erClass, inpErCl) => {
   input.classList.add(inpErCl); 
   const errorElement = form.querySelector(`.${input.id}-error`);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(erClass);
 };

  //Скрывает элемент ошибки
  const hideError = (form, input, erClass, inpErClass) => {
   input.classList.remove(inpErClass);   
   const errorElement = form.querySelector(`.${input.id}-error`);
   errorElement.textContent = " ";
   errorElement.classList.add(erClass);
 };

  //Проверка валидности полей формы
  const inValid = (form, input, errorCl, inpErrorCls) => {
   if(!input.validity.valid) {
    const errorMes = input.validationMessage;   
    showError(form, input, errorMes, errorCl, inpErrorCls);  
  }else{
    hideError(form, input, errorCl, inpErrorCls);
   } 
 };

  const setEventListeners = (form, setEventListenConfig) => {
   const {inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass} = setEventListenConfig; 
   const inputList = Array.from(form.querySelectorAll(`.${inputSelector}`));
   const button = form.querySelector(`.${submitButtonSelector}`);
    toggleButtonState(inputList, button, inactiveButtonClass); 

   inputList.forEach((input) => {
    input.addEventListener('input', function() {
     inValid(form, input, errorClass, inputErrorClass); 
     toggleButtonState(inputList, button, inactiveButtonClass); 
    });});
 };

  const hasInvalidField = inputList => {
   return inputList.some((input) => {
    return !input.validity.valid;
    });     
 };

  const toggleButtonState = (inputList, button, inactiveBut) => {
    if (hasInvalidField(inputList)) { 
      button.classList.add(inactiveBut);
      button.disabled = true;    
    } else{
      button.classList.remove(inactiveBut); 
      button.disabled = false;   
    }  
  };

  // Находим все формы и их поля на странице
  const enableValidation = (validConfig) => {
   const {formSelector} = validConfig;  
   const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
   formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
     evt.preventDefault();
    });
     setEventListeners(form, validConfig);  
   });
  };
  
  enableValidation(config);
  

  