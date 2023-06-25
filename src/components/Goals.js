import React, { useEffect, useState } from "react";
import GoalContainer from "./GoalContainer";
import GoalsPopup from "./GoalsPopup";

function Goals ({ db }) {
    const [goals, setGoals] = useState([]);
    const [goal, setGoal] = useState({
        description: '',
        amount: '',
        currency: '',
        deadline: ''
    });
    const [isGoalsPopupOpen, setIsGoalsPopupOpen] = useState(false);

    const onClose = () => {
        setIsGoalsPopupOpen(false);
    }

    const handleOpenPopup = () => {
        setIsGoalsPopupOpen(true);
    }

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

    const handleDelete = async (id) => {
        try {
            await db.deleteData('goals', id);
            const goalData = await db.getAllData('goals');
            setGoals(goalData);
        } catch (error) {
            console.log('Ошибка удаления цели', error);
        }
    }

    return (
        <div className="goals">
            <div className="goals__title">Цели:</div>
            <div className="goals__container">
                {goals.map((goal, index) => (
                    <GoalContainer key={index} goal={goal} onDelete={handleDelete}/>
                ))}
            </div>
            <button className="goals__button" type="button" onClick={handleOpenPopup}>Добавить цель</button>
            <GoalsPopup isOpen={isGoalsPopupOpen} goal={goal} handleInputChange={handleInputChange} handleSubmit={handleSubmit} onClose={onClose} />
        </div> 
    )
}

export default Goals;