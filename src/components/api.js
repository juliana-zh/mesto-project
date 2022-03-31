const baseUrl = 'https://nomoreparties.co/v1/plus-cohort-8';
const auth = '2757d6a3-540a-4ca9-92d6-16077071be59';
const ctype = 'application/json';

const headers = {
  authorization: auth,
  'Content-Type': ctype
}

const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: auth
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const deleteCard = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: auth
    }
  })
    .then(res => {
      if (res.ok) {
        return;
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { getInitialCards, getUserInfo, postCard, editProfile, deleteCard }
