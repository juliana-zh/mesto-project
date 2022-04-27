import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
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
