function ExchangeRate () {
    const rubToUsd = 86.22; //курс рубля к доллару на 23.06.2023
    const rubToGel = 32.71; //курс рубля к лари на 23.06.2023

    return (
        <div className="exchange">
            <h2 className="exchange__title">Курс валют</h2>
            <div className="exchange__container">
                <p className="exchange__container__paragraph">USD: {rubToUsd}</p>
                <p className="exchange__container__paragraph">GEL: {rubToGel}</p>
            </div>
        </div>
    );
}

export default ExchangeRate;