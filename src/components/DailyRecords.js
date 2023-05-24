import React, {useState} from "react";

function DailyRecords() {
    const [inputValue, setInputValue] = useState('');
    const [selectedCurrency, setSelectedCurency] = useState('');
    const [rub, setRub] = useState(0);
    const [usd, setUsd] = useState(0);
    const [gel, setGel] = useState(0);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurency(e.target.value);
    }

    const handleIncrement = () => {
        const parsedNumber = parseInt(inputValue);

        if(!isNaN(parsedNumber)) {
            switch (selectedCurrency) {
                case 'RUB':
                    setRub(rub + parsedNumber);
                    break;
                case 'USD':
                    setUsd(usd + parsedNumber);
                    break;
                case 'GEL':
                    setGel(gel + parsedNumber);
                    break;
                    default:
                    break;
            }
            setInputValue('');
            setSelectedCurency('');
        }
    };

    const handleDecrement = () => {
        const parsedNumber = parseInt(inputValue);

        if(!isNaN(parsedNumber)) {
            switch (selectedCurrency) {
                case 'RUB':
                    setRub(rub - parsedNumber);
                    break;
                case 'USD':
                    setUsd(usd - parsedNumber);
                    break;
                case 'GEL':
                    setGel(gel - parsedNumber);
                    break;
                    default:
                    break;
            }
            setInputValue('');
            setSelectedCurency('');
        }
    };

    return (
        <div className="daily-records">
            <h2 className="daily-records__title">Бюджет</h2>
            <div className="daily-records__balance-container">
                <div className="daily-records__balance">
                    <h4 className="daily-records__balance-title">Баланс:</h4>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-RUB">RUB: {rub}</span>
                    </div>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-USD">USD: {usd}</span>
                    </div>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-GEL">GEL: {gel}</span>
                    </div>
                </div>
                <div className="daily-records__balance-controls">
                    <h2 className="daily-records__balance-controls-title">Управление балансом</h2>
                    <div className="daily-records__balance-controls-inputs" id="balance-inputs">
                        <label className="daily-records__balance-controls-label" htmlFor="balance-amount">Сумма:</label>
                        <input className="daily-records__balance-controls-input" id="balance-amount" type="number" value={inputValue} onChange={handleInputChange} min="0" required />
                        <label className="daily-records__balance-controls-label" htmlFor="balance-currency">Валюта:</label>
                        <select className="daily-records__balance-controls-select" id="balance-currency" onChange={handleCurrencyChange} value={selectedCurrency} required>
                            <option value="">Выберите валюту</option>
                            <option value="RUB">RUB</option>
                            <option value="GEL">GEL</option>
                            <option value="USD">USD</option>
                        </select>
                        <button className="daily-records__balance-controls-button" id="balance-add" onClick={handleIncrement} type="submit">Добавить</button>
                        <button className="daily-records__balance-controls-button" id="balance-subtract" onClick={handleDecrement} type="submit">Вычесть</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DailyRecords;