import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._fieldValues = this._form.querySelectorAll('.form__item')
    this._submitHandler = evt => {
      this._handleSubmitForm(evt, ...this._fieldValues);
    }
    this._name = document.querySelector('.form__item_el_name');
    this._prof = document.querySelector('.form__item_el_profession');
  }

  setProfileData(name, profession) {
    this._name.value = name;
    this._prof.value = profession;
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
