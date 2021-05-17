import logo from "../images/logo.svg";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { CurrentEmailContext } from "../contexts/CurrentEmailContext";

const Header = (props) => {
  const currentEmail = React.useContext(CurrentEmailContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleButtonMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="page__header page__section page__section_mobile_large">
      <div className="header">
        <img className="header__logo" src={logo} alt="Изображение логотипа" />
        <Switch>
          <Route exact path="/">
            <button
              className={`header__button-menu ${isMenuOpen && "header__button-menu_open"}`}
              type="button"
              onClick={handleButtonMenu}
            ></button>
            <nav className={`header__nav ${isMenuOpen && "header__nav_mobile-open"}`}>
              <p className="header__user">
                {currentEmail}
              </p>
              <button 
                className="header__link" 
                onClick={props.onSignOut}
              >Выйти</button>
            </nav>
          </Route>
          <Route path="/sign-in">
            <Link to="sign-up" className="header__link header__link_mobile-small">Регистрация</Link>
          </Route>
          <Route path="*">
            <Link to="sign-in" className="header__link header__link_mobile-small">Войти</Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
};

export default Header;