function TransactionContainer ({ transaction }) {
    return (
        <div className="transaction-container">
            <div className="transaction-container__paragraph">Дата: {transaction.date}</div>
            <div className="transaction-container__paragraph">Категория: {transaction.category}</div>
            <div className="transaction-container__paragraph">Место: {transaction.location}</div>
            <div className="transaction-container__paragraph">Сумма в иностранной валюте: {transaction.amountForeign} {transaction.currencyForeign}</div>
            <div className="transaction-container__paragraph">Сумма в местной валюте: {transaction.amountLocal} {transaction.currencyLocal}</div>
        </div>
    )
}

export default TransactionContainer;