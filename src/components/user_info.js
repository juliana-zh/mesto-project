import { config, profileTitle, profileSubtitle, editButton } from "../utils/constants.js";
import Api from "./Api.js";
import Card from './card.js'
import { PopupWithForm, PopupWithImage } from "./popup.js";
import Section from "./section.js"

export default class UserInfo {
  constructor(selectorName, selectorProfession, selectorAvatar) {
    this._name = document.querySelector(selectorName);
    this._profession = document.querySelector(selectorProfession);
    this._avatar = document.querySelector(selectorAvatar);
    this._api = new Api(config);
  }

  getUserInfo() {
    this._api.getUserInfo()
      .then((userInfo) => {
        this._name.textContent = userInfo.name;
        this._profession.textContent = userInfo.about;
        this._avatar.src = userInfo.avatar;
        this._userId = userInfo._id;

        this._api.getInitialCards()
          .then(items => {
            const section = new Section({
              items: items,
              renderer: item => {
                return new Card({
                  data: item,
                  userId: this._userId,
                  handleCardClick: () => {
                    const cardPopup = new PopupWithImage('.popup_type_picture');
                    cardPopup.setEventListeners();
                    cardPopup.open(item.link, item.name);
                  },
                }, '#card-template').generate()
              }
            }, '.elements__list');
            section.renderItems();
          })
          .catch(err => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log(err);
      });

    return {
      name: this._name.textContent,
      about: this._profession.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo() {
    const popupEditProfile = new PopupWithForm('.popup_type_editprofile', (evt, title, profession, avatar, imageName, imageRef) => {
      evt.preventDefault();

      const button = evt.submitter;
      button.textContent = "Сохранение...";

      this._api.editProfile(title, profession)
        .then((result) => {
          profileTitle.textContent = result.name;
          profileSubtitle.textContent = result.about;
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          button.textContent = "Сохранить";
        });
    });

    editButton.addEventListener('click', function (evt) {
      popupEditProfile.open();
      popupEditProfile.setEventListeners();
    });
  }
}
