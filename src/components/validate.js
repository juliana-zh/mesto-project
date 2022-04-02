const showInputError = (formElement, inputElement, errorMessage, props) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(props.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(props.errorClass);
};

const hideInputError = (formElement, inputElement, props) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(props.inputErrorClass);
  errorElement.classList.remove(props.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function activateButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

function deactivateButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

const toggleButtonState = (inputList, buttonElement, props) => {
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElement, props.inactiveButtonClass);
  } else {
    activateButton(buttonElement, props.inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement, props) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, props);
  } else {
    hideInputError(formElement, inputElement, props);
  }
};

const setEventListeners = (formElement, props) => {
  const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
  const buttonElement = formElement.querySelector(props.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, props);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, props);
      toggleButtonState(inputList, buttonElement, props);
    });
  });
};

function enableValidation(props) {
  const formList = Array.from(document.querySelectorAll(props.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(props.containerSelector));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, props);
    });

  });
};

export { deactivateButton, enableValidation }
