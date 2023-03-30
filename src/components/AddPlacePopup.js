import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace,
    onLoading }) {
    const { values, handleChange, resetForm } = useForm();

    useEffect(() => {
        resetForm();
    }, [resetForm, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
        });
    };

    return (
        <PopupWithForm
            name="AddPlacePopup"
            title="Новое место"
            btnText="Создать"
            loadingTxt="Добавление..."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onLoading={onLoading}
        >
            <label>
                <input
                    className="popup__input popup__input_type_nameAdd"
                    required
                    value={values.name || ''}
                    type="text"
                    placeholder="Название"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    id="input-title"
                    onChange={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-title-error" />
            </label>
            <label>
                <input
                    className="popup__input popup__input_type_urlAdd"
                    value={values.link || ''}
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="link"
                    id="input-url"
                    required
                    onChange={handleChange}
                />
                <span
                    className="popup__input-error"
                    id="input-url-error" />
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;