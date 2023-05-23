function DailyRecords() {
    return (
        <div className="daily-records">
            <h2 className="daily-records__title">Бюджет</h2>
            <div className="daily-records__balance-container">
                <div className="daily-records__balance">
                    <h4 className="daily-records__balance-title">Баланс:</h4>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-RUB">RUB:</span> 0 RUB
                    </div>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-USD">USD:</span> 0 USD
                    </div>
                    <div className="daily-records__balance-value">
                        <span id="daily-balance-value-GEL">GEL:</span> 0 GEL
                    </div>
                </div>
                <div className="daily-records__balance-controls">
                <h2 className="daily-records__balance-controls-title">Управление балансом</h2>
                <div className="daily-records__balance-controls-inputs" id="balance-inputs">
                    <label className="daily-records__balance-controls-label" htmlFor="balance-amount">Сумма:</label>
                    <input className="daily-records__balance-controls-input" id="balance-amount" type="number" min="0" required />
                    <label className="daily-records__balance-controls-label" htmlFor="balance-currency">Валюта:</label>
                    <select className="daily-records__balance-controls-select" id="balance-currency" required>
                        <option value="">Выберите валюту</option>
                        <option value="RUB">RUB</option>
                        <option value="GEL">GEL</option>
                        <option value="USD">USD</option>
                    </select>
                    <button className="daily-records__balance-controls-button" id="balance-add">Добавить</button>
                    <button className="daily-records__balance-controls-button" id="balance-subtract">Вычесть</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default DailyRecords;