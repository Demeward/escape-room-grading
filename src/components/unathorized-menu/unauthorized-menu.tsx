import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function UnauthorizedMenu() {
  const {pathname} = useLocation();

  return (
    <>
      <nav className="main-nav header__main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link className={`link ${pathname as AppRoute === AppRoute.Main ? 'active' : ''}`} to={AppRoute.Main}>Квесты</Link>
          </li>
          <li className="main-nav__item">
            <Link className={`link ${pathname as AppRoute === AppRoute.Contacts ? 'active' : ''}`} to={AppRoute.Contacts}>Контакты</Link>
          </li>
        </ul>
      </nav>
      <div className="header__side-nav">
        {pathname as AppRoute === AppRoute.Login ? '' : <Link className="btn header__side-item header__login-btn" to={AppRoute.Login} state={{ from: pathname }}>Вход</Link>}
        <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
      </div>
    </>
  );
}

export default UnauthorizedMenu;
