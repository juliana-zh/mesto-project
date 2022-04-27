import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
  }

  setProfileData(name, profession) {
    document.querySelector('.form__item_el_name').value = name;
    document.querySelector('.form__item_el_profession').value = profession;
  }

  _getInputValues() {
    this._profileTitle = document.querySelector('.form__item_el_name');
    this._profileProfession = document.querySelector('.form__item_el_profession');
    this._profileAvatar = document.querySelector('.form__item_el_avatar-ref');
    this._imageName = document.querySelector('.form__item_el_title');
    this._imageRef = document.querySelector('.form__item_el_ref');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      this._getInputValues();
      this._handleSubmitForm(evt, this._profileTitle, this._profileProfession, this._profileAvatar, this._imageName, this._imageRef);
    });
  }

  clearInputs() {
    this._profileTitle.value = "";
    this._profileProfession.value = "";
    this._profileAvatar.value = "";
    this._imageName.value = "";
    this._imageRef.value = "";
  }
}
