import { popupPicture } from "./card.js";

const popupEditProfile = document.querySelector('.popup_type_editprofile');
const popupAddCard = document.querySelector('.popup_type_addcard');

let curPopup;

function esc(e) {
  if (e.key == "Escape") {
    closePopup(curPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_status_opened');
  curPopup = popup;
  document.addEventListener('keydown', esc);
}

function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
  document.removeEventListener('keydown', esc);
}

function closeAllPopups() {
  closePopup(popupEditProfile);
  closePopup(popupAddCard);
  closePopup(popupPicture);
}

export { openPopup, closePopup, closeAllPopups, popupEditProfile, popupAddCard }
