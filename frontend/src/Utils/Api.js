class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };

  _likeCard(cardId, method, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,  {
      method: method,
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  };

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  };

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
      ...this._headers,
      'Authorization': `Bearer ${token}`
    }
    })
    .then(this._checkResponse);
  };

  editProfile({name, about}, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  };

  addCard({name, link}, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse);
  };

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  };

  getAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse);
  };

  changeLikeCardStatus(cardId, isLiked, token) {
    return isLiked ? this._likeCard(cardId, "PUT", token) : this._likeCard(cardId, "DELETE", token)
  };

}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;
