import { config } from "../utils/constants.js";
import Api from "./Api.js";

export default class Card {
  constructor({ data, userId, handleCardClick }, selector) {
    this._ref = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._api = new Api(config);
    this._selector = selector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
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

  //!Добавление слушателей для карточек
  _addCardListeners() {
    this._heart.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements__heart_status_disabled')) {
        this._api.likeCard(this._cardId)
          .then((result) => {
            this._heart.classList.remove('elements__heart_status_disabled')
            this._cardCount.textContent = result.likes.length
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this._api.dislikeCard(this._cardId)
          .then((result) => {
            this._heart.classList.add('elements__heart_status_disabled')
            this._cardCount.textContent = result.likes.length
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })

    if (this._cardOwnerId === this._userId) {
      this._trash.classList.remove('elements__trash_status_disabled')
      this._trash.addEventListener('click', () => {
        this._api.deleteCard(this._cardId)
          .then(() => {
            this._element.remove()
          })
          .catch(err => console.log(err))
      })
    } else {
      this._trash.remove()
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._ref, this._title);
    })
  }
}
