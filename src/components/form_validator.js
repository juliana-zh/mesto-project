export default class FormValidator {
  constructor(props, formElement) {
    this._props = props;
    this._formElement = formElement;

    this._checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    };

    this._showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._props.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._props.errorClass);
    };

    this._hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._props.inputErrorClass);
      errorElement.classList.remove(this._props.errorClass);
      errorElement.textContent = '';
    };

    this._toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        this._deactivateButton(buttonElement);
      } else {
        this._activateButton(buttonElement);
      }
    };
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._props.containerSelector));

    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._props.inputSelector));
    const buttonElement = formElement.querySelector(this._props.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _activateButton(buttonElement) {
    buttonElement.classList.remove(this._props.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  _deactivateButton(buttonElement) {
    buttonElement.classList.add(this._props.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}
