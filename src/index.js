import './styles/index.css';
import { deactivateButton, enableValidation } from './components/validate.js'
import { popupPicture, getCard, insertCard } from './components/card.js';
import { openPopup, closePopup, popupEditProfile, popupAddCard, popupEditAvatar } from './components/modal.js'
import { getInitialCards, getUserInfo, postCard, editProfile, editAvatar } from './components/api.js';
import { INACTIVE_BUTTON_CLASS, SUBMIT_BUTTON_SELECTOR } from './components/constants.js'

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

const closeButtonAddCardProfile = document.querySelector('.popup__close_type_addcard');
const closeButtonEditProfile = document.querySelector('.popup__close_type_editprofile');
const closeButtonPicture = document.querySelector('.popup__close_type_picture');
const closeEditAvatar = document.querySelector('.popup__close_type_editavatar');

const editButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__plus-button');
const avatarEditButton = document.querySelector('.profile__avatar-wrapper');

const fieldName = popupEditProfile.querySelector('.form__item_el_name');
const fieldProfession = popupEditProfile.querySelector('.form__item_el_profession')

const fieldImageName = popupAddCard.querySelector('.form__item_el_title');
const fieldImageRef = popupAddCard.querySelector('.form__item_el_ref');

const fieldUrlAvatar = popupEditAvatar.querySelector('.form__item_el_avatar-ref');

const formEditProfile = document.querySelector('.form_type_editprofile');
const formAddNewCard = document.querySelector('.form_type_addcard');
const formEditAvatar = document.querySelector('.form_type_editavatar');

const cardTemplate = document.querySelector('#card-template').content;
const elementsItem = cardTemplate.querySelector('.elements__item');

const popupBackgrounds = document.querySelectorAll('.popup__background');

closeButtonAddCardProfile.addEventListener('click', function (evt) {
  closePopup(popupAddCard);
});

closeButtonEditProfile.addEventListener('click', function (evt) {
  closePopup(popupEditProfile);
});

editButton.addEventListener('click', function (evt) {
  openPopup(popupEditProfile);
  fieldName.value = profileTitle.textContent.trim();
  fieldProfession.value = profileSubtitle.textContent.trim();
});

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const button = evt.submitter;
  button.textContent = "Сохранение...";

  editProfile(fieldName.value, fieldProfession.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileSubtitle.textContent = result.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
});

addNewCardButton.addEventListener('click', function (evt) {
  openPopup(popupAddCard);
});

avatarEditButton.addEventListener('click', function (evt) {
  openPopup(popupEditAvatar);
});

formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = "Сохранение...";

  const name = fieldImageName.value.trim();
  const link = fieldImageRef.value.trim();

  postCard(name, link)
    .then((result) => {
      insertCard(getCard(result.name,
        result.link,
        result.name,
        elementsItem,
        result.likes,
        result.owner._id,
        result.owner._id,
        result._id));
      fieldImageName.value = "";
      fieldImageRef.value = "";
      closePopup(popupAddCard);
      deactivateButton(buttonElement, INACTIVE_BUTTON_CLASS);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonElement.textContent = "Создать";
    });
});

closeButtonPicture.addEventListener('click', function (evt) {
  closePopup(popupPicture);
});

closeEditAvatar.addEventListener('click', function (evt) {
  closePopup(popupEditAvatar);
});

enableValidation({
  formSelector: '.form__input-card',
  containerSelector: '.form__input-container',
  inputSelector: '.form__item',
  submitButtonSelector: SUBMIT_BUTTON_SELECTOR,
  inactiveButtonClass: INACTIVE_BUTTON_CLASS,
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

for (let i = 0; i < popupBackgrounds.length; ++i) {
  popupBackgrounds[i].addEventListener('click', function (evt) {
    const curPopup = popupBackgrounds[i].closest('.popup');
    closePopup(curPopup);
  });
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach(function (item) {
      insertCard(getCard(item.name,
        item.link,
        item.name,
        elementsItem,
        item.likes,
        userInfo._id,
        item.owner._id,
        item._id));
    });
  })
  .catch(err => {
    console.log(err);
  });

formEditAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  buttonElement.textContent = "Сохранение...";

  editAvatar(fieldUrlAvatar.value)
    .then((result) => {
      profileAvatar.src = fieldUrlAvatar.value;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
});





