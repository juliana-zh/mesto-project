import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._mainImage = this._popup.querySelector('.form__main-image');
    this._capturePicture = this._popup.querySelector('.form__picture-capture');
  }

  open(src, title) {
    super.open();
    this._mainImage.src = src;
    this._mainImage.alt = src;
    this._capturePicture.textContent = title;
  }
}
