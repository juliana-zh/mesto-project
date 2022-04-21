export const INACTIVE_BUTTON_CLASS = 'form__submit-button_type_inactive';
export const SUBMIT_BUTTON_SELECTOR = '.form__submit-button';
export const profileAvatar = document.querySelector('.profile__avatar');

export const editButton = document.querySelector('.profile__edit-button');
export const addNewCardButton = document.querySelector('.profile__plus-button');
export const avatarEditButton = document.querySelector('.profile__avatar-wrapper');

export const formEditProfile = document.querySelector('.form_type_editprofile');
export const formAddNewCard = document.querySelector('.form_type_addcard');
export const formEditAvatar = document.querySelector('.form_type_editavatar');

export const cardContainer = document.querySelector('.elements__list');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '2757d6a3-540a-4ca9-92d6-16077071be59',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  containerSelector: '.form__input-container',
  inputSelector: '.form__item',
  submitButtonSelector: SUBMIT_BUTTON_SELECTOR,
  inactiveButtonClass: INACTIVE_BUTTON_CLASS,
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

