import logo from '../../image/Logo.svg';

function Header({mail, authStatus, redirect}) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого"/>
      <div className="header-auth">
        <p className="header-auth__mail">{mail}</p>
        <button className="header-auth__btn" type="button" onClick={redirect}>{authStatus}</button>
      </div>
    </header>
  );
}

export default Header;
