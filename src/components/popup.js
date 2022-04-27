export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._escapeHandler = e => {
      if (e.key == "Escape") {
        this.close();
      }
    }
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
    const bg = this._popup.querySelector('.popup__background')
    bg.addEventListener('click', evt => {
      this.close();
    });
  }

  _removeListener() {
    document.removeEventListener('keydown', this._escapeHandler)
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
