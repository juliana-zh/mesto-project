import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._formValues = {};
    this._submitHandler = evt => {
      this._getInputValues();
      this._handleSubmitForm(evt, this._formValues);
    }
  }

  setInputValues(data) {
    for (let i = 0; i < this._inputList.length; ++i) {
      this._inputList[i].value = data[this._inputList[i].name];
    }
  }

  _getInputValues() {
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }

  clearInputs() {
    this._form.reset()
  }
}
