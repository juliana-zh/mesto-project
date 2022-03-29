import './styles/index.css';
import { deactivateButton, enableValidation } from './components/validate.js'
import { popupPicture, getCard, insertCard } from './components/card.js';
import { openPopup, closePopup, popupEditProfile, popupAddCard } from './components/modal.js'
import { cardsInfo } from './components/cards_initial.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const closeButtonAddCardProfile = document.querySelector('.popup__close_type_addcard');
const closeButtonEditProfile = document.querySelector('.popup__close_type_editprofile');
const closeButtonPicture = document.querySelector('.popup__close_type_picture');

const editButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__plus-button');

const fieldName = popupEditProfile.querySelector('.form__item_el_name');
const fieldProfession = popupEditProfile.querySelector('.form__item_el_profession')

const fieldImageName = popupAddCard.querySelector('.form__item_el_title');
const fieldImageRef = popupAddCard.querySelector('.form__item_el_ref');

const formEditProfile = document.querySelector('.form_type_editprofile');
const formAddNewCard = document.querySelector('.form_type_addcard');

const cardTemplate = document.querySelector('#card-template').content;
const elementsItem = cardTemplate.querySelector('.elements__item');

const popupBackgrounds = document.querySelectorAll('.popup__background');

const INACTIVE_BUTTON_CLASS = 'form__submit-button_type_inactive';
const SUBMIT_BUTTON_SELECTOR = '.form__submit-button';

cardsInfo.forEach(function (item) {
  insertCard(getCard(item.captionText, item.src, item.alt, elementsItem));
});

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
  closePopup(popupEditProfile);
  profileTitle.textContent = fieldName.value
  profileSubtitle.textContent = fieldProfession.value;
});

addNewCardButton.addEventListener('click', function (evt) {
  openPopup(popupAddCard);
});

formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
  const name = fieldImageName.value.trim()

  insertCard(getCard(name, fieldImageRef.value.trim(), name, elementsItem));
  fieldImageName.value = "";
  fieldImageRef.value = "";
  const buttonElement = formAddNewCard.querySelector(SUBMIT_BUTTON_SELECTOR);
  deactivateButton(buttonElement, INACTIVE_BUTTON_CLASS);
});

closeButtonPicture.addEventListener('click', function (evt) {
  closePopup(popupPicture);
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



