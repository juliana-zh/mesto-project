export default class UserInfo {
  constructor(selectorName, selectorProfession, selectorAvatar, api, sectionHandler, userInfoSetter) {
    this._name = document.querySelector(selectorName);
    this._profession = document.querySelector(selectorProfession);
    this._avatar = document.querySelector(selectorAvatar);
    this._api = api;
    this._sectionHandler = sectionHandler;
    this._userInfoSetter = userInfoSetter;
  }

  getUserInfo() {
    this._api.getUserInfo()
      .then((userInfo) => {
        this._name.textContent = userInfo.name;
        this._profession.textContent = userInfo.about;
        this._avatar.src = userInfo.avatar;
        this._userId = userInfo._id;

        this._api.getInitialCards()
          .then((items) => {
            this._sectionHandler(items, this._userId)
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
    this._userInfoSetter();
  }
}
