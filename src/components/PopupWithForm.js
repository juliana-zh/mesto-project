import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._submitHandler = evt => {
      this._getInputValues();
      this._handleSubmitForm(evt, ...this._fieldValues);
    }
  }

  setProfileData(name, profession) {
    document.querySelector('.form__item_el_name').value = name;
    document.querySelector('.form__item_el_profession').value = profession;
  }

  _getInputValues() {
    this._fieldValues = this._form.querySelectorAll('.form__item')
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
    this._removeSubmitListener();
  }

  _removeSubmitListener() {
    this._form.removeEventListener('submit', this._submitHandler);
  }

  clearInputs() {
    this._form.reset()
  }
}
