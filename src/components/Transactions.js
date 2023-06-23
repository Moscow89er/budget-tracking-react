import { useState, useEffect } from "react";
import TransactionContainer from "./TransactionContainer";

function Transactions({ db }) {
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

    // Инициализируем IndexedDB при загрузке компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionData = await db.getAllData('transactions');
                // Сортировка массива транзакций по дате
                transactionData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setTransactions(transactionData);
            } catch (error) {
                console.log('Ошибка получения данных', error);
            }
        };

        fetchData();
    }, [db]);

    const handleInputChange = (e) => {
        setTransaction({...transaction, [e.target.id]: e.target.value});
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Сохраняем новую транзакцию в IndexedDB 
        try {
            await db.addData('transactions', transaction);
            const transactionData = await db.getAllData('transactions');
            // Сортировка массива транзакций по дате
            transactionData.sort((a, b) => new Date(a.date) - new Date(b.date));
            setTransactions(transactionData);
        } catch (error) {
            console.log('Ошибка сохранения транзации', error);
        }

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
      <section className="transactions">
        <div>
          <div className="transactions__container">
            {transactions.map((transaction, index) => (
                <TransactionContainer key={index} transaction={transaction} />
            ))}
          </div>
        </div>
        <div className="transactions__add-form__container">
            <h3 className="transactions__add-form__title">Добавить транзакцию</h3>
            <form className="transactions__add-form" onSubmit={handleSubmit}>
                <label htmlFor="date">Дата:</label>
                <input className="transactions__add-form__input-date" id="date" type="date" required value={transaction.date} onChange={handleInputChange} />
                <label htmlFor="category">Категория:</label>
                <input className="transactions__add-form__input-category" id="category" type="text" required value={transaction.category} onChange={handleInputChange} />
                <label htmlFor="location">Место:</label>
                <input className="transactions__add-form__input-location" id="location" type="text" required value={transaction.location} onChange={handleInputChange} />
                <label htmlFor="amountForeign">Сумма в местной валюте:</label>
                <input className="transactions__add-form__input-foreign" id="amountForeign" type="number" min="0" step="0.01" required value={transaction.amountForeign} onChange={handleInputChange} />
                <label htmlFor="currencyForeign">Валюта:</label>
                <select className="transactions__add-form__currency-foreign" id="currencyForeign" required value={transaction.currencyForeign} onChange={handleInputChange}>
                    <option value="">Выберите валюту</option>
                    <option value="RUB">RUB</option>
                    <option value="GEL">GEL</option>
                    <option value="USD">USD</option>
                </select>
                <label htmlFor="amountLocal">Эквивалент в иностранной валюте:</label>
                <input className="transactions__add-form__input-local" id="amountLocal" type="number" min="0" step="0.01" required value={transaction.amountLocal} onChange={handleInputChange} />
                <label htmlFor="currencyLocal">Валюта:</label>
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