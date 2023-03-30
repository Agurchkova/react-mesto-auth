import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar,
    onLoading }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="EditAvatarPopup"
            title="Обновить аватар"
            btnText="Сохранить"
            loadingTxt="Сохранение..."
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onLoading={onLoading}
        >
            <label>
                <input
                    className="popup__input popup__input_type_url"
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    id="input-avatar"
                    required
                    ref={avatarRef} />
                <span
                    className="popup__input-error"
                    id="input-avatar-error" />
            </label>
        </PopupWithForm >
    );
};

export default EditAvatarPopup;