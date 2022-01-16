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

function getCard(title, ref, alt) {
  const cardTemplate = document.querySelector('#card-template').content;
  const userCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  userCard.querySelector('.elements__image').src = ref;
  userCard.querySelector('.elements__image').alt = alt;
  userCard.querySelector('.elements__image-caption-text').textContent = title;
  return userCard;
}

const cardContainer = document.querySelector('.elements__list');

function insertCard(card) {
  cardContainer.append(card);
}

cardsInfo.forEach(function (item) {
  insertCard(getCard(item.captionText, item.src, item.alt));
});

const closeButtonAddCardProfile = document.querySelector('.form__close-icon_type_addcard');
const closeButtonEditProfile = document.querySelector('.form__close-icon_type_editprofile');

closeButtonAddCardProfile.addEventListener('click', function (evt) {
  const popupView = evt.target.closest('.popup');
  popupView.classList.remove('popup_status_opened');
});

closeButtonEditProfile.addEventListener('click', function (evt) {
  const popupView = evt.target.closest('.popup');
  popupView.classList.remove('popup_status_opened');
});

const editButton = document.querySelector('.profile__edit-button')

editButton.addEventListener('click', function (evt) {
  const popupView = document.querySelector('.popup_type_editprofile');
  popupView.classList.add('popup_status_opened');
  const name = document.querySelector('.profile__title').textContent.trim();
  const prof = document.querySelector('.profile__subtitle').textContent.trim();

  popupView.querySelector('.form__item_el_name').value = name;
  popupView.querySelector('.form__item_el_profession').value = prof;
});

const formEditProfile = document.querySelector('.form_type_editprofile');

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const popupView = document.querySelector('.popup_type_editprofile');
  popupView.classList.remove('popup_status_opened');
  setTimeout(function () { formEditProfile.submit(); }, 300);
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.querySelector('.profile__title').textContent = urlParams.get('name') || 'Жак-Ив Кусто';
document.querySelector('.profile__subtitle').textContent = urlParams.get('profession') || 'Исследователь океана';

const addNewCardButton = document.querySelector('.profile__plus-button');

addNewCardButton.addEventListener('click', function (evt) {
  const popupView = document.querySelector('.popup_type_addcard');
  popupView.classList.add('popup_status_opened');
});

const title = urlParams.get('title');
const ref = urlParams.get('ref');

if (title && ref) {
  insertCard(getCard(title, ref, 'Картинка'));
}

const formAddNewCard = document.querySelector('.form_type_addcard');

formAddNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const popupView = document.querySelector('.popup_type_addcard');
  popupView.classList.remove('popup_status_opened');
  setTimeout(function () { formAddNewCard.submit(); }, 300);
});

cardContainer.addEventListener('click', function (evt) {
  const target = evt.target;
  if (target.classList.contains('elements__heart')) {
    target.classList.toggle('elements__heart_status_disabled');
  }
})

cardContainer.addEventListener('click', function (evt) {
  const target = evt.target;
  if (target.classList.contains('elements__trash')) {
    const card = target.closest('.elements__item');
    cardContainer.removeChild(card);
  }
})

cardContainer.addEventListener('click', function (evt) {
  const target = evt.target;
  if (target.classList.contains('elements__image')) {
    const card = target.closest('.elements__item');
    const popupView = document.querySelector('.popup_type_picture');
    popupView.classList.add('popup_status_opened');

    const src = card.querySelector('.elements__image').src;
    const capture = card.querySelector('.elements__image-caption-text').textContent.trim();

    popupView.querySelector('.form__main-image').src = src;
    popupView.querySelector('.form__picture-capture').textContent = capture;
  }
})

const closeButtonPicture = document.querySelector('.form__close-icon_type_picture');

closeButtonPicture.addEventListener('click', function (evt) {
  const popupView = evt.target.closest('.popup');
  popupView.classList.remove('popup_status_opened');
});
