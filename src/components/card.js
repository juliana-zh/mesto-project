//data = {title, ref, alt, elementsItem, likes, userId, cardOwnerId, cardId}
export default class Card {
  constructor(data, selector) {
    this._ref = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._cardOwnerId = data.owner._id;
    this._selector = selector;
    //this.userId =
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
    this._hearth = this._element.querySelector('.elements__heart')
    this._trash = this._element.querySelector('.elements__trash')
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._ref;//???
    this._cardImage.alt = this._title;//???
    this._element.querySelector('.elements__image-caption-text').textContent = this._title;
    this._element.querySelector('.elements__num-heart').textContent = this._likes.length
    this._addCardListeners();
    return this._element
  }

  //!Добавление слушателей для карточек
  _addCardListeners() {
    this._hearth.addEventListener('click', () => {

    })

    if (this._cardOwnerId === this.userId) {
      this._trash.addEventListener('click', () => {

      })
    }

    this._cardImage.addEventListener('click', () => {

    })

  }

}







// const popupPicture = document.querySelector('.popup_type_picture');
// const mainImage = popupPicture.querySelector('.form__main-image');
// const capturePicture = popupPicture.querySelector('.form__picture-capture');


// function toggleLike(element, elClass) {
//   element.classList.toggle(elClass);
// }

// function removeItem(container, item) {
//   container.removeChild(item);
// }

// function showLikes(elem, numLikes) {
//   elem.textContent = numLikes;
//   elem.classList.remove('elements__num-heart_status_disabled')
// }

// function toZeroLikes(elem) {
//   elem.classList.add('elements__num-heart_status_disabled')
// }

// function checkUserLikes(userId, likes) {
//   for (let i = 0; i < likes.length; ++i) {
//     if (likes[i]._id == userId) {
//       return true;
//     }
//   }
//   return false;
// }

// function getCard(title, ref, alt, elementsItem, likes, userId, cardOwnerId, cardId) {
//   const userCard = elementsItem.cloneNode(true);
//   const cardImage = userCard.querySelector('.elements__image');
//   cardImage.src = ref;
//   cardImage.alt = alt;

//   userCard.querySelector('.elements__image-caption-text').textContent = title;

//   const nLikesElem = userCard.querySelector('.elements__num-heart');
//   const numLikes = likes.length;

//   const heart = userCard.querySelector('.elements__heart');

//   if (numLikes > 0) {
//     showLikes(nLikesElem, numLikes);
//     if (checkUserLikes(userId, likes)) {
//       heart.classList.remove('elements__heart_status_disabled')
//     }
//   }

//   heart.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('elements__heart_status_disabled')) {
//       likeCard(cardId)
//         .then((result) => {
//           showLikes(nLikesElem, result.likes.length);
//           toggleLike(evt.target, 'elements__heart_status_disabled');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       dislikeCard(cardId)
//         .then((result) => {
//           if (result.likes.length == 0) {
//             toZeroLikes(nLikesElem)
//           } else {
//             showLikes(nLikesElem, result.likes.length)
//           }
//           toggleLike(evt.target, 'elements__heart_status_disabled');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });

//   if (cardOwnerId == userId) {
//     const trash = userCard.querySelector('.elements__trash');
//     trash.addEventListener('click', function (evt) {
//       deleteCard(cardId)
//         .then(() => {
//           removeItem(cardContainer, userCard);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//     trash.classList.remove('elements__trash_status_disabled');
//   }

//   cardImage.addEventListener('click', function (evt) {
//     openPopup(popupPicture);
//     mainImage.src = ref;
//     mainImage.alt = ref;
//     capturePicture.textContent = title;
//   });

//   return userCard;
// }

// function insertCard(card) {
//   cardContainer.prepend(card);
// }

// export { popupPicture, getCard, insertCard }
