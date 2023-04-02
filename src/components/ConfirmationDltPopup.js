import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationDltPopup({ isOpen, onClose, card, onSubmit, onLoading,
    onCloseEsc, onCloseOverlay }) {

    function handleConfirmiation(event) {
        event.preventDefault();
        onSubmit(card);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onCloseEsc);

            return () => {
                document.removeEventListener('keydown', onCloseEsc);
            };
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', onCloseOverlay);

            return () => {
                document.removeEventListener('mousedown', onCloseOverlay);
            };
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="confirmationForm"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleConfirmiation}
            onLoading={onLoading}
            onCloseEsc={onCloseEsc}
            onCloseOverlay={onCloseOverlay}>
            <button
                className={`popup__save-button button`}
                type="submit">
                {onLoading ? "Удаление..." : "Удалить"}
            </button>
        </PopupWithForm>
    )
}

export default ConfirmationDltPopup;