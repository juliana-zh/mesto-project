export default class Card {
  constructor({ data, userId, handleCardClick, handleLike, handleDelete }, selector) {
    this._ref = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._selector = selector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }

  //!получение разметки
  _getTemlateElement() {
    const userCard = document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true)
    return userCard
  }

  //!заполнение карточек данными
  generate() {
    this._element = this._getTemlateElement();
    this._heart = this._element.querySelector('.elements__heart');
    this._trash = this._element.querySelector('.elements__trash');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardCount = this._element.querySelector('.elements__num-heart');
    this._cardImage.src = this._ref;
    this._cardImage.alt = this._title;
    this._element.querySelector('.elements__image-caption-text').textContent = this._title;

    this._cardCount.textContent = this._likes.length
    this._cardCount.classList.remove('elements__num-heart_status_disabled')

    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._heart.classList.remove('elements__heart_status_disabled')
      }
    });

    this._addCardListeners();
    return this._element
  }

  getId() {
    return this._cardId;
  }

  updateLikesEnable(result) {
    this._heart.classList.remove('elements__heart_status_disabled')
    this._cardCount.textContent = result.likes.length
  }

  updateLikesDisable(result) {
    this._heart.classList.add('elements__heart_status_disabled')
    this._cardCount.textContent = result.likes.length
  }

  removeElement() {
    this._element.remove();
  }

  isLiked(evt) {
    return !evt.target.classList.contains('elements__heart_status_disabled');
  }

  //!Добавление слушателей для карточек
  _addCardListeners() {
    this._heart.addEventListener('click', (evt) => {
      this._handleLike(evt, this);
    })

    if (this._cardOwnerId === this._userId) {
      this._trash.classList.remove('elements__trash_status_disabled')
      this._trash.addEventListener('click', () => {
        this._handleDelete(this);
      })
    } else {
      this._trash.remove()
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._ref, this._title);
    })
  }
}
