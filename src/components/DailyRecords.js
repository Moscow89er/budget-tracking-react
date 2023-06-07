import React, { useState, useRef, useEffect } from "react";
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from "chart.js";
import IndexedDB from "./IndexedDB";

Chart.register(LinearScale, BarController, CategoryScale, BarElement);

const db = new IndexedDB('BudgetTrackingDB'); // создание нового экземпляра IndexedDB

function DailyRecords() {
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
            type: 'bar',
            data: {
              labels: ['RUB', 'USD', 'GEL'],
              datasets: [
                {
                  label: 'Баланс',
                  data: [rub*rubToUsd, usd, gel*gelToUsd],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

        (async () => {
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
        })();
          
        return () => {
            myChartRef.current.destroy();
        };
    }, [rub, usd, gel]);


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
            <h2 className="daily-records__title">Бюджет</h2>
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