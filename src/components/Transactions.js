import { useState, useEffect } from "react";
import TransactionContainer from "./TransactionContainer";
import TransactionsPopup from "./TransactionsPopup";

function Transactions({ db, rubToUsd, rubToGel, setIsSuccessPopupOpen }) {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({
        date: '',
        category: '',
        location: '',
        amountForeign: '',
        currencyForeign: '',
        amountLocal: ''
    });
    const [isGoalsPopupOpen, setTransactionsPopupOpen] = useState(false);

    const onClose = () => {
        setTransactionsPopupOpen(false);
    }

    const handleOpenPopup = () => {
        setTransactionsPopupOpen(true);
    }

    // Инициализируем IndexedDB при загрузке компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionData = await db.getAllData('transactions');
                // Сортировка массива транзакций по дате
                transactionData.sort((a, b) => new Date(b.date) - new Date(a.date));
                setTransactions(transactionData);
            } catch (error) {
                console.log('Ошибка получения данных', error);
            }
        };

        fetchData();
    }, [db]);

    const handleInputChange = (e) => {
        const updatedTransaction = {...transaction, [e.target.id]: e.target.value};
    
        // Преобразовываем иностранную сумму в рубли, если указана сумма и валюта
        if (e.target.id === 'amountForeign' || e.target.id === 'currencyForeign') {
            if (updatedTransaction.amountForeign && updatedTransaction.currencyForeign) {
                let convertedAmount;
                switch (updatedTransaction.currencyForeign) {
                    case 'USD':
                        convertedAmount = updatedTransaction.amountForeign * rubToUsd;
                        break;
                    case 'GEL':
                        convertedAmount = updatedTransaction.amountForeign * rubToGel;
                        break;
                    default:
                        // По умолчанию сумма в рублях равна иностранной сумме
                        convertedAmount = updatedTransaction.amountForeign;
                        break;
                }
                updatedTransaction.amountLocal = +convertedAmount.toFixed(2);
            }
        }
    
        setTransaction(updatedTransaction);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Сохраняем новую транзакцию в IndexedDB 
        try {
            await db.addData('transactions', transaction);
            const transactionData = await db.getAllData('transactions');
            // Сортировка массива транзакций по дате
            transactionData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(transactionData);
            onClose();
            setIsSuccessPopupOpen('true');
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                }, 3000);
        } catch (error) {
            console.log('Ошибка сохранения транзации', error);
        }

        setTransaction({
            date: '',
            category: '',
            location: '',
            amountForeign: '',
            currencyForeign: '',
            amountLocal: ''
        });
    }

    return (
      <section className="transactions">
            <div>
                <div className="transactions__title">Транзакции:</div>
                <div className="transactions__container">
                    {transactions.map((transaction, index) => (
                        <TransactionContainer key={index} transaction={transaction} />
                    ))}
                </div>
                <button className="transactions__button" type="button" onClick={handleOpenPopup} >Добавить транзакцию</button>
                <TransactionsPopup
                    isOpen={isGoalsPopupOpen}
                    transaction={transaction}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    onClose={onClose}
                />
            </div>
      </section>
    );
}
  
export default Transactions;