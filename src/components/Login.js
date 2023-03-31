import React from 'react';
import useForm from '../hooks/useForm';

function Login({ onLogin }) {
    const { values, handleChange } = useForm({});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        onLogin(values);
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form"
                onSubmit={handleSubmit}>
                <input
                    className="auth__input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />
                <input
                    className="auth__input"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="8"
                    required
                    autoComplete="password"
                />
                <button className="auth__button"
                    type="submit">
                    Войти
                </button>
            </form>
        </div >
    );
};

export default Login;
