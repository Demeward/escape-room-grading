import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { selectAuthorizationStatus, selectAuthorizationChecked } from '../../store/user/user';
import { useAppSelector } from '../../hooks/index';


function PrivateRoute() {
  const location = useLocation().pathname;
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorizationChecked = useAppSelector(selectAuthorizationChecked);

  if (!isAuthorizationChecked) {
    return null;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Outlet />
      : <Navigate to={AppRoute.Login} state={{ from: location }} replace />
  );
}

export default PrivateRoute;
