function DailyRecordsPopup({ isOpen, inputValue, selectedCurrency, handleInputChange, handleCurrencyChange, handleIncrement, handleDecrement, onClose }) {
    return (
        <div className={`daily_records_popup ${isOpen ? "daily_records_popup__opened" : ""}`}>
            <h2 className="daily_records_popup__title">Управление балансом</h2>
            <div className="daily_records_popup__inputs">
                <label className="daily_records_popup__label" htmlFor="balance-amount">Сумма:</label>
                <input className="daily_records_popup__input" id="balance-amount" type="number" value={inputValue} onChange={handleInputChange} min="0" required />
                <label className="daily_records_popup__label" htmlFor="balance-currency">Валюта:</label>
                <select className="daily_records_popup__select" id="balance-currency" onChange={handleCurrencyChange} value={selectedCurrency} required>
                    <option value="">Выберите валюту</option>
                    <option value="RUB">RUB</option>
                    <option value="GEL">GEL</option>
                    <option value="USD">USD</option>
                </select>
                <button className="daily_records_popup__button" onClick={handleIncrement} type="submit">Добавить</button>
                <button className="daily_records_popup__button" onClick={handleDecrement} type="submit">Вычесть</button>
            </div>
            <button onClick={onClose} type="button" className="daily_records_popup__close-button"></button>
        </div>
    )
}

export default DailyRecordsPopup;
