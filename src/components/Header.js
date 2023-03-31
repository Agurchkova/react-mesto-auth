import React from "react";
import { Link, useLocation } from 'react-router-dom';

import logoHeader from '../images/logo.svg';

function Header({ loggedIn, email, onSignOut }) {
    const location = useLocation();

    return (
        <header className="header">
            <img
                src={logoHeader}
                className="header__logo"
                alt="Логотип Место Россия"
            />
            {location.pathname === "/sign-in" && (
                <Link to="/sign-up"
                    className="header__link">
                    Регистрация
                </Link>
            )}
            {location.pathname === "/sign-up" && (
                <Link to="/sign-up"
                    className="header__link">
                    Войти
                </Link>
            )}
            {loggedIn && (
                <nav className="header__auth">
                    <p className="header__email">
                        {email}
                    </p>
                    <button className="header__button-sign-out"
                        onClick={() => onSignOut()}>
                        Выйти
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;