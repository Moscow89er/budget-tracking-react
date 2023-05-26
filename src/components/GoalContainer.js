function GoalContainer ({ goal }) {
    return (
        <div className="goal-container">
            <div className="goal-container__paragraph">Описание: {goal.description}</div>
            <div className="goal-container__paragraph">Сумма: {goal.amount} {goal.currency}</div>
            <div className="goal-container__paragraph">Дедлайн: {goal.deadline}</div>
        </div>
    )
}

export default GoalContainer;