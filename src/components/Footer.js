import React from 'react';
import { Link, useMatch } from 'react-router-dom';

function Footer () {
    return (
        <footer className="footer">
            <Link className={useMatch("/") ? "footer__button footer__button_active" : "footer__button"} to="/">
                <h2 className="footer__button-title">Б</h2>
                <p className="footer__button-subtitle">юджет</p>
            </Link>
            <Link className={useMatch("/goals") ? "footer__button footer__button_active" : "footer__button"} to="/goals">
                <h2 className="footer__button-title">Ц</h2>
                <p className="footer__button-subtitle">ели</p>
            </Link>
            <Link  className={useMatch("/transactions") ? "footer__button footer__button_active" : "footer__button"} to="/transactions">
                <h2 className="footer__button-title">Т</h2>
                <p className="footer__button-subtitle">ранзакции</p>
            </Link>
        </footer>
    );
}

export default Footer;