function TransactionsPopup({ isOpen, transaction, handleInputChange, handleSubmit, onClose }) {
    return (
        <div className={`transactions_popup ${isOpen ? "transactions_popup_opened" : ""}`}>
            <div className="transactions_popup__container">
                <h3 className="transactions_popup__title">Добавить транзакцию</h3>
                <form className="transactions_popup__add-form" onSubmit={handleSubmit}>
                    <label htmlFor="date">Дата:</label>
                    <input className="transactions_popup__add-form__input-date" id="date" type="date" required value={transaction.date} onChange={handleInputChange} />
                    <label htmlFor="category">Категория:</label>
                    <input className="transactions_popup__add-form__input-category" id="category" type="text" required value={transaction.category} onChange={handleInputChange} />
                    <label htmlFor="location">Место:</label>
                    <input className="transactions_popup__add-form__input-location" id="location" type="text" required value={transaction.location} onChange={handleInputChange} />
                    <label htmlFor="amountForeign">Сумма</label>
                    <input className="transactions_popup__add-form__input-foreign" id="amountForeign" type="number" min="0" step="0.01" required value={transaction.amountForeign} onChange={handleInputChange} />
                    <label htmlFor="currencyForeign">Валюта:</label>
                    <select className="transactions_popup__add-form__currency-foreign" id="currencyForeign" required value={transaction.currencyForeign} onChange={handleInputChange}>
                        <option value="">Выберите валюту</option>
                        <option value="RUB">RUB</option>
                        <option value="GEL">GEL</option>
                        <option value="USD">USD</option>
                    </select>
                    <button className="transactions_popup__button" type="submit">Добавить транзакцию</button>
                </form>
                <button className="transactions_popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default TransactionsPopup;