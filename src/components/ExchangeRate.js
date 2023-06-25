function ExchangeRate ({ rubToUsd, rubToGel }) {
    return (
        <div className="exchange">
            <h2 className="exchange__title">Курс валют:</h2>
            <div className="exchange__container">
                <p className="exchange__container__paragraph">USD: {rubToUsd}</p>
                <p className="exchange__container__paragraph">GEL: {rubToGel}</p>
            </div>
        </div>
    );
}

export default ExchangeRate;