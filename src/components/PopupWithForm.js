import React from "react";

function PopupWithForm({ isOpen, name, title, onClose, children, onSubmit,
    onLoading, loadingTxt, btnText }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button button"
                    aria-label="Закрыть окно"
                    onClick={onClose} />
                <form
                    className="popup__form"
                    name={`${name}`}
                    onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        className={`popup__save-button button`}
                        type="submit">
                        {onLoading ? loadingTxt : btnText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;

