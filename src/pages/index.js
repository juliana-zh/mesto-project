import '../styles/index.css';
import {
  cardContainer, config, addNewCardButton, profileTitle, profileSubtitle, editButton, avatarEditButton, profileAvatar, INACTIVE_BUTTON_CLASS,
  formAddNewCard, validationConfig, formEditProfile, formEditAvatar
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/card.js";
import UserInfo from '../components/user_info.js';
import FormValidator from '../components/form_validator.js'

import { PopupWithImage, PopupWithForm } from "../components/popup.js";

export const api = new Api(config)

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
userInfo.getUserInfo();
userInfo.setUserInfo();

const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', function (evt, title, profession, avatar, imageName, imageLink) {
  evt.preventDefault();

  const button = evt.submitter;
  button.textContent = "Сохранение...";

  api.editAvatar(avatar)
    .then((result) => {
      profileAvatar.src = avatar;
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
});

avatarEditButton.addEventListener('click', function (evt) {
  popupEditAvatar.open();
  popupEditAvatar.setEventListeners();
});

const popupAddCard = new PopupWithForm('.popup_type_addcard', function (evt, title, profession, avatar, imageName, imageLink) {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = "Сохранение...";

  api.postCard(imageName, imageLink)
    .then((result) => {
      const card = new Card({
        data: result,
        userId: this._userId,
        handleCardClick: () => {
          const cardPopup = new PopupWithImage('.popup_type_picture');
          cardPopup.setEventListeners();
          cardPopup.open(item.link, item.name);
        },
      }, '#card-template').generate();
      cardContainer.prepend(card);
      this.close();
      deactivateButton(buttonElement, INACTIVE_BUTTON_CLASS);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonElement.textContent = "Создать";
    });
});

addNewCardButton.addEventListener('click', function (evt) {
  popupAddCard.open();
  popupAddCard.setEventListeners();
});

const formValidatorAddNewCard = new FormValidator(validationConfig, formAddNewCard);
formValidatorAddNewCard.enableValidation();

const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
formValidatorEditAvatar.enableValidation();

