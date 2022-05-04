import '../styles/index.css';
import {
  config, addNewCardButton, editButton, avatarEditButton, formAddNewCard, validationConfig, formEditProfile, formEditAvatar
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js'

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

export const api = new Api(config)

function handleLike(evt, card) {
  if (!card.isLiked(evt)) {
    api.likeCard(card.getId())
      .then((result) => {
        card.updateLikesEnable(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.dislikeCard(card.getId())
      .then((result) => {
        card.updateLikesDisable(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDelete(card) {
  api.deleteCard(card.getId())
    .then(() => {
      card.removeElement();
    })
    .catch(err => console.log(err))
}

const cardPopup = new PopupWithImage('.popup_type_picture');
cardPopup.setEventListeners();

function createCard(item, userId) {
  const cardElement = new Card({
    data: item,
    userId: userId,
    handleCardClick: () => {
      cardPopup.open(item.link, item.name);
    },
    handleLike,
    handleDelete
  }, '#card-template').generate()
  return cardElement
}

const section = new Section({
  renderer: (item, userId) => {
    return createCard(item, userId);
  }
}, '.elements__list');


const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
formValidatorEditProfile.enableValidation();

function handlerUserInfo() {
  return api.getUserInfo();
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', handlerUserInfo);

const popupEditProfile = new PopupWithForm('.popup_type_editprofile', (evt, data) => {
  evt.preventDefault();

  popupEditProfile.renderLoading(true)

  api.editProfile(data.name, data.profession)
    .then(() => {
      popupEditProfile.close();
      userInfo.setUserInfo({
        name: data.name,
        about: data.profession
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false)
    });
});

popupEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  formValidatorEditProfile.deactivateButton();
  userInfo.getUserInfo()
    .then((userData) => {
      popupEditProfile.setInputValues({
        name: userData.name,
        profession: userData.about
      });
    })
    .catch((err) => {
      console.log(err);
    })

  formValidatorEditProfile.resetValidation();
});

Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
  .then(([userData, items]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(items, userData._id);
  })
  .catch(err => {
    console.log(err);
  });

const formValidatorAddNewCard = new FormValidator(validationConfig, formAddNewCard);
formValidatorAddNewCard.enableValidation();

const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
formValidatorEditAvatar.enableValidation();

const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', function (evt, data) {
  evt.preventDefault();

  popupEditAvatar.renderLoading(true);

  api.editAvatar(data['avatar-ref'])
    .then((result) => {
      userInfo.setUserInfo({
        avatar: result.avatar
      });
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false)
    });
});

const popupAddCard = new PopupWithForm('.popup_type_addcard', function (evt, data) {
  evt.preventDefault();

  popupAddCard.renderLoading(true)

  api.postCard(data.title, data.ref)
    .then((result) => {
      const card = createCard(result, result.owner_id);
      section.addItem(card);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false)
    });
});

popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();

addNewCardButton.addEventListener('click', function () {
  popupAddCard.open();
  formValidatorAddNewCard.deactivateButton();
  formValidatorAddNewCard.resetValidation();
});

avatarEditButton.addEventListener('click', function () {
  popupEditAvatar.open();
  formValidatorEditAvatar.deactivateButton();
  formValidatorEditAvatar.resetValidation();
});







