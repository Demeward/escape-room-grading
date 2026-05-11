import { Routes, Route } from 'react-router-dom';
import { AppRoute, RequestStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Layout from '../layout/layout';
import QuestPage from '../../pages/quest-page/quest-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { useAppSelector } from '../../hooks';
import { selectQuestsStatus } from '../../store/main/main';
import { selectAuthorizationChecked } from '../../store/user/user';
import ReservationPage from '../../pages/reservation-page/reservation-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';


function App() {
  const questsStatus = useAppSelector(selectQuestsStatus);
  const isAuthorizationChecked = useAppSelector(selectAuthorizationChecked);

  if (!isAuthorizationChecked && questsStatus === RequestStatus.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Quest} element={<QuestPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={AppRoute.Booking} element={<BookingPage />}/>
          <Route path={AppRoute.Reservation} element={<ReservationPage />} />
        </Route>
        <Route path={AppRoute.Contacts} element={<ContactsPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
