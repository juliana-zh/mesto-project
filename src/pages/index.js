import '../styles/index.css';
import { cardContainer, config, myId, addNewCardButton, profileTitle, profileSubtitle, editButton, avatarEditButton, profileAvatar, INACTIVE_BUTTON_CLASS } from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/card.js";
import UserInfo from '../components/user_info.js';

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






// import { deactivateButton, enableValidation } from '../components/validate.js'
// import { popupPicture, getCard, insertCard } from '../components/card.js';
// import { openPopup, closePopup, popupEditProfile, popupAddCard, popupEditAvatar } from '../components/modal.js'
// import { getInitialCards, getUserInfo, postCard, editProfile, editAvatar } from '../components/api.js';
// import { INACTIVE_BUTTON_CLASS, SUBMIT_BUTTON_SELECTOR } from '../utils/constants.js'


// closeButtonAddCardProfile.addEventListener('click', function (evt) {
//   closePopup(popupAddCard);
// });

// closeButtonEditProfile.addEventListener('click', function (evt) {
//   closePopup(popupEditProfile);
// });

// editButton.addEventListener('click', function (evt) {
//   openPopup(popupEditProfile);
//   fieldName.value = profileTitle.textContent.trim();
//   fieldProfession.value = profileSubtitle.textContent.trim();
// });

// formEditProfile.addEventListener('submit', function (evt) {
//   evt.preventDefault();

//   const button = evt.submitter;
//   button.textContent = "Сохранение...";

//   editProfile(fieldName.value, fieldProfession.value)
//     .then((result) => {
//       profileTitle.textContent = result.name;
//       profileSubtitle.textContent = result.about;
//       closePopup(popupEditProfile);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       button.textContent = "Сохранить";
//     });
// });

// addNewCardButton.addEventListener('click', function (evt) {
//   openPopup(popupAddCard);
// });

// avatarEditButton.addEventListener('click', function (evt) {
//   openPopup(popupEditAvatar);
// });

// formAddNewCard.addEventListener('submit', function (evt) {
//   evt.preventDefault();

//   const buttonElement = evt.submitter;
//   buttonElement.textContent = "Сохранение...";

//   const name = fieldImageName.value.trim();
//   const link = fieldImageRef.value.trim();

//   postCard(name, link)
//     .then((result) => {
//       insertCard(getCard(result.name,
//         result.link,
//         result.name,
//         elementsItem,
//         result.likes,
//         result.owner._id,
//         result.owner._id,
//         result._id));
//       fieldImageName.value = "";
//       fieldImageRef.value = "";
//       closePopup(popupAddCard);
//       deactivateButton(buttonElement, INACTIVE_BUTTON_CLASS);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       buttonElement.textContent = "Создать";
//     });
// });

// closeButtonPicture.addEventListener('click', function (evt) {
//   closePopup(popupPicture);
// });

// closeEditAvatar.addEventListener('click', function (evt) {
//   closePopup(popupEditAvatar);
// });

// enableValidation({
//   formSelector: '.form__input-card',
//   containerSelector: '.form__input-container',
//   inputSelector: '.form__item',
//   submitButtonSelector: SUBMIT_BUTTON_SELECTOR,
//   inactiveButtonClass: INACTIVE_BUTTON_CLASS,
//   inputErrorClass: 'form__item_type_error',
//   errorClass: 'form__item-error_active'
// });

// for (let i = 0; i < popupBackgrounds.length; ++i) {
//   popupBackgrounds[i].addEventListener('click', function (evt) {
//     const curPopup = popupBackgrounds[i].closest('.popup');
//     closePopup(curPopup);
//   });
// }

// Promise.all([getUserInfo(), getInitialCards()])
//   .then(([userInfo, cards]) => {
//     profileTitle.textContent = userInfo.name;
//     profileSubtitle.textContent = userInfo.about;
//     profileAvatar.src = userInfo.avatar;

//     cards.forEach(function (item) {
//       insertCard(getCard(item.name,
//         item.link,
//         item.name,
//         elementsItem,
//         item.likes,
//         userInfo._id,
//         item.owner._id,
//         item._id));
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

// formEditAvatar.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const buttonElement = evt.submitter;
//   buttonElement.textContent = "Сохранение...";

//   editAvatar(fieldUrlAvatar.value)
//     .then((result) => {
//       profileAvatar.src = fieldUrlAvatar.value;
//       closePopup(popupEditAvatar);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       buttonElement.textContent = "Сохранить";
//     });
// });





