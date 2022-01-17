const cardsInfo = [
  {
    src: './images/karachaevsk.jpg',
    alt: 'Старинное здание на фоне гор и лесов',
    captionText: 'Карачаевск',
  },
  {
    src: './images/mount_elbrus.jpg',
    alt: 'Поле, куст, и вдалеке виднеется гора',
    captionText: 'Гора Эльбрус',
  },
  {
    src: './images/dombay.jpg',
    alt: 'Горы, покрытые лесом, и на заднем фоне заснеженная вершина',
    captionText: 'Домбай',
  },
  {
    src: './images/amazonka.jpg',
    alt: 'Вид на реку Амазонку сверху',
    captionText: 'Амазонка',
  },
  {
    src: './images/antarktida.jpg',
    alt: 'Ледник и океан',
    captionText: 'Антарктида',
  },
  {
    src: './images/karach-cherk.jpg',
    alt: 'Озеро, в котором отражаются горы',
    captionText: 'Карачаево-Черкесия',
  },
]

const popupEditProfile = document.querySelector('.popup_type_editprofile');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupPicture = document.querySelector('.popup_type_picture');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardContainer = document.querySelector('.elements__list');

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

const mainImage = popupPicture.querySelector('.form__main-image');
const capturePicture = popupPicture.querySelector('.form__picture-capture');

const cardTemplate = document.querySelector('#card-template').content;
const elementsItem = cardTemplate.querySelector('.elements__item');

function openPopup(popup) {
  popup.classList.add('popup_status_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
}

function getCard(title, ref, alt) {
  const userCard = elementsItem.cloneNode(true);
  const cardImage = userCard.querySelector('.elements__image');
  cardImage.src = ref;
  cardImage.alt = alt;

  userCard.querySelector('.elements__image-caption-text').textContent = title;

  const heart = userCard.querySelector('.elements__heart');
  heart.addEventListener('click', function (evt) {
    heart.classList.toggle('elements__heart_status_disabled');
  });

  const trash = userCard.querySelector('.elements__trash');
  trash.addEventListener('click', function (evt) {
    cardContainer.removeChild(userCard);
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

cardsInfo.forEach(function (item) {
  insertCard(getCard(item.captionText, item.src, item.alt));
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

  insertCard(getCard(name, fieldImageRef.value.trim(), name));
  fieldImageName.value = "";
  fieldImageRef.value = "";
});

closeButtonPicture.addEventListener('click', function (evt) {
  closePopup(popupPicture);
});
