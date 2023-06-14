import React, { useEffect, useState } from "react";
import GoalContainer from "./GoalContainer";

function Goals ({ db }) {
    const [goals, setGoals] = useState([]);
    const [goal, setGoal] = useState({
        description: '',
        amount: '',
        currency: '',
        deadline: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goalData = await db.getAllData('goals');
                setGoals(goalData);
            } catch (error) {
                console.log('Ошибка получения данных', error);
            }
        };

        fetchData();
    }, [db]);

    const handleInputChange = (e) => {
        setGoal({...goal, [e.target.id]: e.target.value});
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await db.addData('goals', goal);
            const goalData = await db.getAllData('goals');
            setGoals(goalData);
        } catch (error) {
            console.log('Ошибка сохранения цели', error);
        }

        setGoal({
            description: '',
            amount: '',
            currency: '',
            deadline: ''
        });
    }

    return (
        <div className="goals">
            <div className="goals__container">
                {goals.map((goal, index) => (
                    <GoalContainer key={index} goal={goal}/>
                ))}
            </div>
            <div className="goals__controls">
            <h2 className="goals__controls__title">Управление целями</h2>
                <form className="goals__controls__form" onSubmit={handleSubmit}>
                    <label htmlFor="description">Описание:</label>
                    <input className="goals__controls__form-input" id="description" type="text" required value={goal.description} onChange={handleInputChange} />
                    <label htmlFor="amount">Сумма:</label>
                    <input className="goals__controls__form-input" id="amount" type="number" min="0" required value={goal.amount} onChange={handleInputChange} />
                    <label htmlFor="currency">Валюта:</label>
                    <select className="goals__controls__form-currency" id="currency" required value={goal.currency} onChange={handleInputChange}>
                        <option value="">Выберите валюту</option>
                        <option value="RUB">RUB</option>
                        <option value="GEL">GEL</option>
                        <option value="USD">USD</option>
                    </select>
                    <label htmlFor="deadline">Дедлайн:</label>
                    <input className="goals__controls__form-input" id="deadline" type="date" required value={goal.deadline} onChange={handleInputChange} />
                    <button className="goals__controls__form-button" type="submit">Добавить цель</button>
                </form>
            </div>
        </div> 
    )
}

export default Goals;