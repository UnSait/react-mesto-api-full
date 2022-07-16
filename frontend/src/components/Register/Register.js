import React from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {

  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")



  function handleSubmitForm(e) {
    e.preventDefault()
    onRegister({password, email})
}

  return (
      <div className="auth-window">
        <form className="auth-window__form" onSubmit={handleSubmitForm} noValidate>
          <h2 className="auth-window__title">Регистрация</h2>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="mail-input"
            className="auth-window__input"
            type="email"
            placeholder="Email"
            minLength="6"
            maxLength="40"
            required
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password-input"
            className="auth-window__input"
            type="text"
            placeholder="Пароль"
            minLength="5"
            maxLength="40"
            required
          />
          <button className="auth-window__btn" type="submit">
          Зарегистрироваться
          </button>
        </form>
        <Link to="signin" className="auth-window__redirect">Уже зарегистрированы? Войти</Link>
      </div>
  );

}

export default Register;
