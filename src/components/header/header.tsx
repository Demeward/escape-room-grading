import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user';
import AuthorizedMenu from '../authorized-menu/authorized-menu';
import Logo from '../logo/logo';
import UnauthorizedMenu from '../unathorized-menu/unauthorized-menu';


function Header() {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        {authorizationStatus === AuthorizationStatus.Auth ? <AuthorizedMenu /> : <UnauthorizedMenu />}
      </div>
    </header>

  );
}

export default Header;
