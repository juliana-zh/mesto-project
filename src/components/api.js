const baseUrl = 'https://nomoreparties.co/v1/plus-cohort-8';
const auth = '2757d6a3-540a-4ca9-92d6-16077071be59';
const ctype = 'application/json';

const headers = {
  authorization: auth,
  'Content-Type': ctype
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers
  })
    .then(checkResponse);
}

const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: auth
    }
  })
    .then(checkResponse);
}

const postCard = (name, link) => {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

const editProfile = (name, about) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

const deleteCard = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: auth
    }
  })
    .then(checkResponse);
}

const likeCard = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: auth
    }
  })
    .then(checkResponse);
}

const dislikeCard = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: auth
    }
  })
    .then(checkResponse);
}

const editAvatar = (url) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(checkResponse);
}

export { getInitialCards, getUserInfo, postCard, editProfile, deleteCard, likeCard, dislikeCard, editAvatar }
