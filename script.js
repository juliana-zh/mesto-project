const cardsInfo = [
  {
    src: './images/karachaevsk.jpg',
    alt: 'Старинное здание на фоне гор и лесов',
    caption_text: 'Карачаевск',
  },
  {
    src: './images/mount_elbrus.jpg',
    alt: 'Поле, куст, и вдалеке виднеется гора',
    caption_text: 'Гора Эльбрус',
  },
  {
    src: './images/dombay.jpg',
    alt: 'Горы, покрытые лесом, и на заднем фоне заснеженная вершина',
    caption_text: 'Домбай',
  },
  {
    src: './images/amazonka.jpg',
    alt: 'Вид на реку Амазонку сверху',
    caption_text: 'Амазонка',
  },
  {
    src: './images/antarktida.jpg',
    alt: 'Ледник и океан',
    caption_text: 'Антарктида',
  },
  {
    src: './images/karach-cherk.jpg',
    alt: 'Озеро, в котором отражаются горы',
    caption_text: 'Карачаево-Черкесия',
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

function insertCard(card) {
  const cardContainer = document.querySelector('.elements__list');
  cardContainer.append(card);
}

cardsInfo.forEach(function (item) {
  insertCard(getCard(item.caption_text, item.src, item.alt));
});

let closeButton = document.querySelector('.form__close-icon');

closeButton.addEventListener('click', function (evt) {
  let popupView = evt.target.closest('.popup');
  popupView.classList.remove('popup_status_opened');
});


