import React from "react";
import { Link, withRouter } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onRegister(email, password);
  };

  return (
    <main className="main">
      <section className="page__section">
        <form
          className="form-auth"
          name="register"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="form-auth__title">Регистрация</h1>
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
          <button className="form-auth__submit" type="submit">
            Зарегистрироваться
          </button>
          <p className="form-auth__text">
            Уже зарегистрированы?{" "}
            <Link className="form-auth__link" to="sign-in">Войти</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default withRouter(Register);
