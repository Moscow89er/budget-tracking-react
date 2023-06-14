import headerLogo from '../images/header_logo.png';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="logo"></img>
            <h2 className="header__title">УЧЕТ ФИНАНСОВ</h2>
        </header>
    );
}

export default Header;