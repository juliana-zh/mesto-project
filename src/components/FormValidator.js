export default class FormValidator {
  constructor(props, formElement) {
    this._props = props;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._props.inputSelector));
    this._buttonElement = formElement.querySelector(this._props.submitButtonSelector);

    this._checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    this._showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._props.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._props.errorClass);
    };

    this._hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._props.inputErrorClass);
      errorElement.classList.remove(this._props.errorClass);
      errorElement.textContent = '';
    };

    this._toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        FormValidator.deactivateButton(this._props.inactiveButtonClass, this._buttonElement);
      } else {
        this._activateButton();
      }
    };
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  static deactivateButton(inactiveButtonClass, buttonElement) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _activateButton() {
    this._buttonElement.classList.remove(this._props.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}
