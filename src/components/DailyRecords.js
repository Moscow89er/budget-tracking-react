import React, { useState, useRef, useEffect } from "react";
import { Chart, PieController, ArcElement, CategoryScale, Tooltip, LinearScale } from 'chart.js';

Chart.register(PieController, ArcElement, CategoryScale, LinearScale, Tooltip);

function DailyRecords({ db }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedCurrency, setSelectedCurency] = useState('');
    const [rub, setRub] = useState(0);
    const [usd, setUsd] = useState(0);
    const [gel, setGel] = useState(0);
    const rubToUsd = 0.012; //курс рубля к доллару на 25.05.2023
    const gelToUsd = 0.39; //курс лари к доллару на 25.05.2023
    const chartRef = useRef(null);
    const myChartRef = useRef(null);

    useEffect(() => {
        const chartCanvasContext = chartRef.current.getContext('2d');

        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        myChartRef.current = new Chart(chartCanvasContext, {
            type: 'pie',
            data: {
              labels: ['RUB', 'USD', 'GEL'],
              datasets: [
                {
                  label: 'Баланс',
                  data: [rub*rubToUsd, usd, gel*gelToUsd],
                  backgroundColor: [
                    'rgba(0, 0, 205, 0.6)',
                    'rgba(11, 156, 49, 0.6)',
                    'rgba(255, 0, 0, 0.6)',
                  ],
                  borderColor: [
                    'rgba(0, 0, 205, 1)',
                    'rgba(11, 156, 49, 1)',
                    'rgba(255, 0, 0, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
            },
          });

        const fetchData = async () => {
            try {
                const data = await db.getAllData('dailyRecords');
                if (data.length > 0) {
                    setRub(data[0].rub);
                    setUsd(data[0].usd);
                    setGel(data[0].gel);
                } else {
                    await db.addData('dailyRecords', {id: 1, rub: 0, usd: 0, gel: 0 });
                }
            } catch(error) {
                console.log('Ошибка получения данных:', error);
            }
        };

        fetchData();
          
        return () => {
            myChartRef.current.destroy();
        };
    }, [rub, usd, gel, db]);


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurency(e.target.value);
    };

    const handleIncrement = async () => {
        const parsedNumber = parseInt(inputValue);

        if(!isNaN(parsedNumber)) {
            try {
                switch (selectedCurrency) {
                    case 'RUB':
                        await db.updateData('dailyRecords', {id: 1, rub: rub + parsedNumber, usd: usd, gel: gel});
                        setRub(rub + parsedNumber);
                        break;
                    case 'USD':
                        await db.updateData('dailyRecords', {id: 1, rub: rub, usd: usd + parsedNumber, gel: gel});
                        setUsd(usd + parsedNumber);
                        break;
                    case 'GEL':
                        await db.updateData('dailyRecords', {id: 1, rub: rub, usd: usd, gel: gel + parsedNumber});
                        setGel(gel + parsedNumber);
                        break;
                        default:
                        break;
                }
                setInputValue('');
                setSelectedCurency('');
            } catch(error) {
                console.log('Ошибка обновления данных:', error);
            }
        }
    };

    const handleDecrement = async () => {
        const parsedNumber = parseInt(inputValue);

        if(!isNaN(parsedNumber)) {
            try {
                switch (selectedCurrency) {
                    case 'RUB':
                        await db.updateData('dailyRecords', {id: 1, rub: rub - parsedNumber, usd: usd, gel: gel});
                        setRub(rub - parsedNumber);
                        break;
                    case 'USD':
                        await db.updateData('dailyRecords', {id: 1, rub: rub, usd: usd - parsedNumber, gel: gel});
                        setUsd(usd - parsedNumber);
                        break;
                    case 'GEL':
                        await db.updateData('dailyRecords', {id: 1, rub: rub, usd: usd, gel: gel - parsedNumber});
                        setGel(gel - parsedNumber);
                        break;
                        default:
                        break;
                }
                setInputValue('');
                setSelectedCurency('');
            } catch(error) {
                console.log('Ошибка обновления данных:', error);
            }
        }
    };

    return (
        <div className="daily-records">
            <div className="daily-records__balance-container">
                <div className="daily-records__balance">
                    <h4 className="daily-records__balance-title">Баланс:</h4>
                    <div className="daily-records__balance-value">
                        <span>RUB: {rub}</span>
                    </div>
                    <div className="daily-records__balance-value">
                        <span>USD: {usd}</span>
                    </div>
                    <div className="daily-records__balance-value">
                        <span>GEL: {gel}</span>
                    </div>
                </div>
                <canvas className="daily-records__canvas" ref={chartRef} />
                <div className="daily-records__balance-controls">
                    <h2 className="daily-records__balance-controls-title">Управление балансом</h2>
                    <div className="daily-records__balance-controls-inputs">
                        <label className="daily-records__balance-controls-label" htmlFor="balance-amount">Сумма:</label>
                        <input className="daily-records__balance-controls-input" id="balance-amount" type="number" value={inputValue} onChange={handleInputChange} min="0" required />
                        <label className="daily-records__balance-controls-label" htmlFor="balance-currency">Валюта:</label>
                        <select className="daily-records__balance-controls-select" id="balance-currency" onChange={handleCurrencyChange} value={selectedCurrency} required>
                            <option value="">Выберите валюту</option>
                            <option value="RUB">RUB</option>
                            <option value="GEL">GEL</option>
                            <option value="USD">USD</option>
                        </select>
                        <button className="daily-records__balance-controls-button" onClick={handleIncrement} type="submit">Добавить</button>
                        <button className="daily-records__balance-controls-button" onClick={handleDecrement} type="submit">Вычесть</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DailyRecords;