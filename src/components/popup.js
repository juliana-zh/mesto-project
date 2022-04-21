class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  open() {
    this._popup.classList.add('popup_status_opened');
  }

  close() {
    this._popup.classList.remove('popup_status_opened');
  }

  _handleEscClose() {
    document.addEventListener('keydown', e => {
      if (e.key == "Escape") {
        this.close();
      }
    });
  }

  _handleBackgroundClose() {
    const bg = this._popup.querySelector('.popup__background')
    bg.addEventListener('click', evt => {
      this.close();
    });
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', evt => {
      this.close();
    });

    this._handleEscClose();
    this._handleBackgroundClose();
  }
}

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(src, title) {
    super.open();
    const mainImage = this._popup.querySelector('.form__main-image');
    const capturePicture = this._popup.querySelector('.form__picture-capture');
    mainImage.src = src;
    mainImage.alt = src;
    capturePicture.textContent = title;
  }
}

class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    this._profileTitle = document.querySelector('.form__item_el_name').value;
    this._profileProfession = document.querySelector('.form__item_el_profession').value;
    this._profileAvatar = document.querySelector('.form__item_el_avatar-ref').value;
    this._imageName = document.querySelector('.form__item_el_title').value;
    this._imageRef = document.querySelector('.form__item_el_ref').value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      this._getInputValues();
      this._handleSubmitForm(evt, this._profileTitle, this._profileProfession, this._profileAvatar, this._imageName, this._imageRef);
    });
  }

  close() {
    super.close();
    this._profileTitle = "";
    this._profileProfession = "";
    this._profileAvatar = "";
    this._imageName = "";
    this._imageRef = "";
  }
}

export { Popup, PopupWithImage, PopupWithForm }
