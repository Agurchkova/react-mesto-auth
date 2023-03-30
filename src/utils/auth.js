import { _checkResponse } from './utils';

export const BASE_URL = 'https://auth.nomoreparties.co';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const registerSignUp = ({ email, password }) => {
    return fetch(`{$BASE_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    })
        .then((res) => _checkResponse(res));
};

export const authorizeSignIn = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    })
        .then((res) => _checkResponse(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => _checkResponse(res));
};
