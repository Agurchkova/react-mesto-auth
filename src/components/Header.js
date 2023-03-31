import React from "react";
import logoHeader from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {

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
                <div className="header__auth">
                    <p className="header__email">
                        {userEmail}
                    </p>
                    <button className="header__button-sign-out"
                        onClick={() => onSignOut()}>
                        Выйти
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;