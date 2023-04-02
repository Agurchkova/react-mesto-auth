import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormWithValidation from "../hooks/useFormWithValidation";

function PopupWithForm({ isOpen, name, title, onClose,
    children, onSubmit }) {

    const { resetForm } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        currentUser ? resetForm(currentUser) : resetForm();
    }, [resetForm, isOpen, currentUser]);

    return (
        <div className={`popup popup_type_${name} 
        ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button button"
                    aria-label="Закрыть окно"
                    onClick={onClose} />
                <form
                    className="form popup__form"
                    name={`${name}`}
                    onSubmit={onSubmit}
                    noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;

