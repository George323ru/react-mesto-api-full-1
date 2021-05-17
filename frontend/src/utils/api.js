class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, data) {
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    });
  }

  _deleteData(url) {
    return this._fetch(url, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  _getData(url) {
    return this._fetch(url, {
      method: "GET",
      headers: this._headers,
    });
  }

  _patchData(url, data) {
    return this._fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  _postData(url, data) {
    return this._fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  _putData(url) {
    return this._fetch(url, {
      method: "PUT",
      headers: this._headers,
    });
  }

  addCard({ name, link }) {
    return this._postData(`${this._baseUrl}/cards`, { name, link });
  }

  addCardLike(cardId) {
    return this._putData(`${this._baseUrl}/cards/${cardId}/likes`);
  }

  changeAvatar(link) {
    return this._patchData(`${this._baseUrl}/users/me/avatar`, {
      avatar: link,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteCardLike(cardId) : this.addCardLike(cardId);
  }

  changeUserInfo({ name, about }) {
    return this._patchData(`${this._baseUrl}/users/me`, { name, about });
  }

  deleteCard(cardId) {
    return this._deleteData(`${this._baseUrl}/cards/${cardId}`);
  }

  deleteCardLike(cardId) {
    return this._deleteData(`${this._baseUrl}/cards/${cardId}/likes`);
  }

  getInitialCards() {
    return this._getData(`${this._baseUrl}/cards`);
  }

  getUserInfo() {
    return this._getData(`${this._baseUrl}/users/me`);
  }
}

export const createApi = (token) => {
  return new Api({
    baseUrl: "http://localhost:3005",  // 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
