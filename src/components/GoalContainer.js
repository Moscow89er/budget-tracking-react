function GoalContainer ({ goal, onDelete }) {
    const handleDeleteClick = () => {
        onDelete(goal.id);
    }

    return (
        <div className="goal-container">
            <div className="goal-container__paragraph-container">
                <div className="goal-container__paragraph">Описание: {goal.description}</div>
                <div className="goal-container__paragraph">Сумма: {goal.amount} {goal.currency}</div>
                <div className="goal-container__paragraph">Дедлайн: {goal.deadline}</div>
            </div>
            <button className="goal-container__delete-button" onClick={handleDeleteClick}>x</button>
        </div>
    )
}

export default GoalContainer;