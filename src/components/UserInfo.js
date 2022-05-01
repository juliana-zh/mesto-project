export default class UserInfo {
  constructor(selectorName, selectorProfession, selectorAvatar, handlerUserInfo) {
    this._name = document.querySelector(selectorName);
    this._profession = document.querySelector(selectorProfession);
    this._avatar = document.querySelector(selectorAvatar);
    this._handlerUserInfo = handlerUserInfo;
  }

  getUserInfo() {
    return this._handlerUserInfo();
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._name.textContent = name;
    }

    if (about) {
      this._profession.textContent = about;
    }

    if (avatar) {
      this._avatar.src = avatar;
    }
  }
}
