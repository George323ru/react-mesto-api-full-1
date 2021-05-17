function Footer() {
  return (
    <footer className="footer page__section page__footer">
      <p className="footer__copyright">
        &copy; {`${new Date().getFullYear()}`} Mesto Russia,
        Анастасия&nbsp;Циберная
      </p>
    </footer>
  );
}

export default Footer;