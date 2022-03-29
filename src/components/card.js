import { openPopup } from "./modal.js";

const popupPicture = document.querySelector('.popup_type_picture');
const mainImage = popupPicture.querySelector('.form__main-image');
const capturePicture = popupPicture.querySelector('.form__picture-capture');
const cardContainer = document.querySelector('.elements__list');

function toggleLike(element, elClass) {
  element.classList.toggle(elClass);
}

function removeItem(container, item) {
  container.removeChild(item);
}

function getCard(title, ref, alt, elementsItem) {
  const userCard = elementsItem.cloneNode(true);
  const cardImage = userCard.querySelector('.elements__image');
  cardImage.src = ref;
  cardImage.alt = alt;

  userCard.querySelector('.elements__image-caption-text').textContent = title;

  const heart = userCard.querySelector('.elements__heart');
  heart.addEventListener('click', function (evt) {
    toggleLike(evt.target, 'elements__heart_status_disabled');
  });

  const trash = userCard.querySelector('.elements__trash');
  trash.addEventListener('click', function (evt) {
    removeItem(cardContainer, userCard);
  });

  cardImage.addEventListener('click', function (evt) {
    openPopup(popupPicture);
    mainImage.src = ref;
    capturePicture.textContent = title;
  });

  return userCard;
}

function insertCard(card) {
  cardContainer.prepend(card);
}

export { popupPicture, getCard, insertCard }
