function GoalsPopup({ isOpen, goal, handleInputChange, handleSubmit, onClose }) {
    return (
        <div className={`goals_popup ${isOpen ? "goals_popup_opened" : ""}`}>
            <div className="goals_popup__container">
                <h2 className="goals_popup__title">Добавить цель</h2>
                <form className="goals_popup__form" onSubmit={handleSubmit}>
                    <label htmlFor="description">Описание:</label>
                    <input className="goals_popup__form-input" id="description" type="text" required value={goal.description} onChange={handleInputChange} />
                    <label htmlFor="amount">Сумма:</label>
                    <input className="goals_popup__form-input" id="amount" type="number" min="0" required value={goal.amount} onChange={handleInputChange} />
                    <label htmlFor="currency">Валюта:</label>
                    <select className="goals_popup__form-currency" id="currency" required value={goal.currency} onChange={handleInputChange}>
                        <option value="">Выберите валюту</option>
                        <option value="RUB">RUB</option>
                        <option value="GEL">GEL</option>
                        <option value="USD">USD</option>
                    </select>
                    <label htmlFor="deadline">Дедлайн:</label>
                    <input className="goals_popup__form-input" id="deadline" type="date" required value={goal.deadline} onChange={handleInputChange} />
                    <button className="goals_popup__form-button" type="submit">Добавить цель</button>
                </form>
                <button className="goals_popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default GoalsPopup;