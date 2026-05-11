import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';


function Logo() {
  const { pathname } = useLocation();

  if (pathname as AppRoute === AppRoute.Main) {
    return (
      <span className="logo header__logo">
        <svg width="134" height="52" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </span>
    );
  } else {
    return (
      <Link className="logo header__logo" to={AppRoute.Main} aria-label="Перейти на Главную">
        <svg width="134" height="52" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </Link>
    );
  }
}

export default Logo;
