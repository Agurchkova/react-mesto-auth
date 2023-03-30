import checkMarkSuccess from '../images/image-success.svg';
import crossMarkUnSuccess from '../images/image-unsuccess.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup popup_type_infotooltip ${isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button button"
                    aria-label="Закрыть окно"
                    onClick={onClose} />
                <img
                    src={isSuccess ? checkMarkSuccess : crossMarkUnSuccess}
                    alt={isSuccess ? 'Регистрация прошла успешно'
                        : 'Регистрация не прошла'}
                    className="popup__signup-image"
                />
                <h2 className="popup__signup-title">
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
};

export default InfoTooltip;