import { useState } from "react";
import TransactionContainer from "./TransactionContainer";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({
        date: '',
        category: '',
        location: '',
        amountForeign: '',
        currencyForeign: '',
        amountLocal: '',
        currencyLocal: ''
    });

    const handleInputChange = (e) => {
        setTransaction({...transaction, [e.target.id]: e.target.value});
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setTransactions([...transactions, transaction]);
        setTransaction({
            date: '',
            category: '',
            location: '',
            amountForeign: '',
            currencyForeign: '',
            amountLocal: '',
            currencyLocal: ''
        });
    }

    return (
      <section className="transactions" id="transaction">
        <div>
          <h2 className="transactions__title">Транзакции</h2>
          <div className="transactions__container" id="transactions__container">
            {transactions.map((transaction, index) => (
                <TransactionContainer key={index} transaction={transaction} />
            ))}
          </div>
        </div>
        <div className="transactions__add-form__container" onSubmit={handleSubmit}>
            <h3 className="transactions__add-form__title">Добавить транзакцию</h3>
            <form className="transactions__add-form" id="transaction-form" onSubmit={handleSubmit}>
            <label htmlFor="transaction-date">Дата:</label>
            <input className="transactions__add-form__input-date" id="date" type="date" required value={transaction.date} onChange={handleInputChange} />
            <label htmlFor="transaction-category">Категория:</label>
            <input className="transactions__add-form__input-category" id="category" type="text" required value={transaction.category} onChange={handleInputChange} />
            <label htmlFor="transaction-location">Место:</label>
            <input className="transactions__add-form__input-location" id="location" type="text" required value={transaction.location} onChange={handleInputChange} />
            <label htmlFor="transaction-amount-foreign">Сумма в иностранной валюте:</label>
            <input className="transactions__add-form__input-foreign" id="amountForeign" type="number" min="0" step="0.01" required value={transaction.amountForeign} onChange={handleInputChange} />
            <label htmlFor="transaction-currency-foreign">Валюта:</label>
            <select className="transactions__add-form__currency-foreign" id="currencyForeign" required onChange={handleInputChange} value={transaction.currencyForeign}>
                <option value="">Выберите валюту</option>
                <option value="RUB">RUB</option>
                <option value="GEL">GEL</option>
                <option value="USD">USD</option>
            </select>
            <label htmlFor="transaction-amount-local">Сумма в местной валюте:</label>
            <input className="transactions__add-form__input-local" id="amountLocal" type="number" min="0" step="0.01" required value={transaction.amountLocal} onChange={handleInputChange} />
            <label htmlFor="transaction-currency-local">Валюта:</label>
            <select className="transactions__add-form__currency-local" id="currencyLocal" required onChange={handleInputChange} value={transaction.currencyLocal}>
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