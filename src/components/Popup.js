export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._escapeHandler = e => {
      if (e.key == "Escape") {
        this.close();
      }
    }
    this._bg = this._popup.querySelector('.popup__background');
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_status_opened');
  }

  close() {
    this._popup.classList.remove('popup_status_opened');
    this._removeListener()
  }

  _handleEscClose() {
    document.addEventListener('keydown', this._escapeHandler);
  }

  _handleBackgroundClose() {
    this._bg.addEventListener('click', () => {
      this.close();
    });
  }

  _removeListener() {
    document.removeEventListener('keydown', this._escapeHandler)
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._handleEscClose();
    this._handleBackgroundClose();
  }
}
