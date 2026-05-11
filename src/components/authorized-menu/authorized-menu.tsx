import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/user/api-action';
import { useCallback } from 'react';


function AuthorizedMenu() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogoutClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

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
          <li className="main-nav__item">
            <Link className={`link ${pathname as AppRoute === AppRoute.Reservation ? 'active' : ''}`} to={AppRoute.Reservation}>Мои бронирования</Link>
          </li>
        </ul>
      </nav>
      <div className="header__side-nav">
        <a className="btn btn--accent header__side-item" href="#" onClick={handleLogoutClick}>Выйти</a>
        <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
      </div>
    </>
  );
}

export default AuthorizedMenu;
