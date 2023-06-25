function SuccessPopup({ isOpen }) {
    return (
        <div className={`success_popup ${isOpen ? "success_popup_opened" : ""}`}>
            <div className="success_popup__container">
                <h2 className="success_popup__title">Запись успешно сохранена</h2>
            </div>
        </div>
    )
}

export default SuccessPopup;