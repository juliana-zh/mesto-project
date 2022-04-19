import '../styles/index.css';
import { validationConfig, cardContainer } from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'

const api = new Api({
  url: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '2757d6a3-540a-4ca9-92d6-16077071be59',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards()
  .then(res => {
    res.forEach(card => {
      const newCard = new Card(card, '#card-template').generate()
      cardContainer.append(newCard)

    });
  })



  // const cardList = new Section({
  //   renderer: (card) => {
  //     cardList.setItem(newCard)
  //   },
  //   cardContainer
  // })














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





