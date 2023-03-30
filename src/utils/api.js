import { _checkResponse } from './utils';

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(_checkResponse);
    }

    /// получение карточек с сервера
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }

    /// получаем данные о пользователе
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
    }

    /// редактирование данных о пользователе
    editUserData(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    /// добавляем новую карточку попапом
    addItem(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    /// удаляем карточку
    deleteItem(itemId) {
        return this._request(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    /// редактирование аватара пользователя
    changeAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    /// ставим лайк карточке
    setLike(itemId) {
        return this._request(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    /// удаляем лайк
    deleteLike(itemId) {
        return this._request(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }
    // поддержка лайков и дизлайков
    changeLikeCardStatus(itemId, isLiked) {
        return this._request(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers,
        })
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `ed6511d1-8679-4d0e-906b-e0ea7dcb3ddf`,
    },
});

export default api;
