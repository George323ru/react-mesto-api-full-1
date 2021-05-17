import React from "react";

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onLogin(email, password);
  }

  return (
    <main className="main">
      <section className="page__section">
        <form
          className="form-auth"
          name="login"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="form-auth__title">Вход</h1>
          <input
            className="form-auth__input"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            autoComplete="off"
          />
          <input
            className="form-auth__input"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Пароль"
            required
            autoComplete="off"
          />
          <button className="form-auth__submit" type="submit">Войти</button>
        </form>
      </section>
    </main>
  );
}

export default Login;