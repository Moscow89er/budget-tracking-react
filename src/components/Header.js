import headerLogo from '../images/header_logo.png';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="logo"></img>
        </header>
    );
}

export default Header;