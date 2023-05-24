function Transactions() {
    return (
      <section className="transactions" id="transaction">
        <div>
          <h2 className="transactions__title">Транзакции</h2>
          <div className="transactions__container" id="transactions__container"></div>
        </div>
        <div className="transactions__add-form__container">
            <h3 className="transactions__add-form__title">Добавить транзакцию</h3>
            <form className="transactions__add-form" id="transaction-form">
            <label htmlFor="transactions-date">Дата:</label>
            <input className="transactions__add-form__input-date" id="transaction-date" type="date" required />
            <label htmlFor="transactions-category">Категория:</label>
            <input className="transactions__add-form__input-category" id="transaction-category" type="text" required />
            <label htmlFor="transactions-location">Место:</label>
            <input className="transactions__add-form__input-location" id="transaction-location" type="text" required />
            <label htmlFor="transactions-amount-foreign">Сумма в иностранной валюте:</label>
            <input className="transactions__add-form__input-foreign" id="transaction-amount-foreign" type="number" min="0" step="0.01" required />
            <label htmlFor="transactions-currency-foreign">Валюта:</label>
            <select className="transactions__add-form__currency-foreign" id="transaction-currency-foreign" required>
                <option value="">Выберите валюту</option>
                <option value="RUB">RUB</option>
                <option value="GEL">GEL</option>
                <option value="USD">USD</option>
            </select>
            <label htmlFor="transactions-amount-local">Сумма в местной валюте:</label>
            <input className="transactions__add-form__input-local" id="transaction-amount-local" type="number" min="0" step="0.01" required />
            <label htmlFor="transactions-currency-local">Валюта:</label>
            <select className="transactions__add-form__currency-local" id="transaction-currency-local" required>
                <option value="">Выберите валюту</option>
                <option value="RUB">RUB</option>
                <option value="GEL">GEL</option>
                <option value="USD">USD</option>
            </select>
            <button className="transactions__add-form__button" type="submit">Добавить транзакцию</button>
            </form>
        </div>
      </section>
    );
  }
  

export default Transactions;