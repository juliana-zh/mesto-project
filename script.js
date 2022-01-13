let closeButton = document.querySelector('.form__close-icon');

closeButton.addEventListener('click', function () {
  let popupView = document.querySelector('.popup');
  popupView.classList.remove('popup_status_opened');
});
