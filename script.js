let closeButton = document.querySelector('.form__close-icon');

closeButton.addEventListener('click', function (evt) {
  let popupView = evt.target.closest('.popup');
  popupView.classList.remove('popup_status_opened');
});

function getCard(title, ref) {
  const cardTemplate = document.querySelector('#card-template').content;
  const userCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  userCard.querySelector('.elements__image').src = ref;
  userCard.querySelector('.elements__image-caption-text').textContent = title;
  return userCard;
}

function insertCard(card) {
  const cardContainer = document.querySelector('.elements__list');
  cardContainer.append(card);
}

