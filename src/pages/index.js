import '../styles/index.css';
import {
  cardContainer, config, addNewCardButton, profileTitle, profileSubtitle, editButton, avatarEditButton, profileAvatar, INACTIVE_BUTTON_CLASS,
  formAddNewCard, validationConfig, formEditProfile, formEditAvatar
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

export const api = new Api(config)

const sectionHandler = (items, userId) => {
  const section = new Section({
    items: items,
    renderer: item => {
      return new Card({
        data: item,
        userId: userId,
        handleCardClick: () => {
          const cardPopup = new PopupWithImage('.popup_type_picture');
          cardPopup.setEventListeners();
          cardPopup.open(item.link, item.name);
        },
      }, '#card-template').generate()
    }
  }, '.elements__list');
  section.renderItems();
}

const userInfoSetter = () => {
  const popupEditProfile = new PopupWithForm('.popup_type_editprofile', (evt, title, profession) => {
    evt.preventDefault();

    const button = evt.submitter;
    button.textContent = "Сохранение...";

    api.editProfile(title.value, profession.value)
      .then((result) => {
        profileTitle.textContent = result.name;
        profileSubtitle.textContent = result.about;
        popupEditProfile.close();
        FormValidator.deactivateButton(button, INACTIVE_BUTTON_CLASS);
        popupEditProfile.clearInputs();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        button.textContent = "Сохранить";
      });
  });

  editButton.addEventListener('click', evt => {
    popupEditProfile.open();
    popupEditProfile.setEventListeners();
    popupEditProfile.setProfileData(profileTitle.textContent, profileSubtitle.textContent);
  });
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', api, sectionHandler, userInfoSetter);
userInfo.getUserInfo();
userInfo.setUserInfo();

const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', function (evt, avatar) {
  evt.preventDefault();

  const button = evt.submitter;
  button.textContent = "Сохранение...";

  api.editAvatar(avatar.value)
    .then((result) => {
      profileAvatar.src = avatar.value;
      this.close();
      FormValidator.deactivateButton(button, INACTIVE_BUTTON_CLASS);
      this.clearInputs();
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

const popupAddCard = new PopupWithForm('.popup_type_addcard', function (evt, imageName, imageLink) {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = "Сохранение...";

  api.postCard(imageName.value, imageLink.value)
    .then((result) => {
      const card = new Card({
        data: result,
        userId: result.owner._id,
        api: api,
        handleCardClick: () => {
          const cardPopup = new PopupWithImage('.popup_type_picture');
          cardPopup.setEventListeners();
          cardPopup.open(result.link, result.name);
        },
      }, '#card-template').generate();
      cardContainer.prepend(card);
      this.close();
      FormValidator.deactivateButton(buttonElement, INACTIVE_BUTTON_CLASS);
      this.clearInputs();
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




