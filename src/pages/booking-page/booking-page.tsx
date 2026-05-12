import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentQuest, selectQuestBookingPlaces, selectQuestBookingPlacesStatus } from '../../store/quest/quest';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import Map from '../../components/map/map';
import BookingForm from '../../components/booking-form/booking-form';
import { fetchQuestAction, fetchQuestBookingAction } from '../../store/quest/api-action';
import { AppRoute, RequestStatus } from '../../const';
import { QuestBooking } from '../../types/quest';
import { redirectToRoute } from '../../store/main/main';


function BookingPage() {
  const dispatch = useAppDispatch();
  const {id: currentId } = useParams();
  const currentQuest = useAppSelector(selectCurrentQuest);
  const questBookingPlaces = useAppSelector(selectQuestBookingPlaces);
  const questBookingPlacesStatus = useAppSelector(selectQuestBookingPlacesStatus);
  const [currentBookingPlace, setBookingPlace] = useState<QuestBooking | null>(null);

  const handleActiveBookingPlaceChange = useCallback((place: QuestBooking) => setBookingPlace(place), []);

  useEffect(() => {
    if(!currentQuest || currentQuest.id !== currentId) {
      dispatch(fetchQuestAction(currentId as string))
        .unwrap()
        .catch((rejectedValue) => {
          if (rejectedValue === 'NOT_FOUND') {
            dispatch(redirectToRoute(AppRoute.NotFound));
          }
        });
    }
  }, [currentId, currentQuest, dispatch]);

  useEffect(() => {
    let isMounted = true;
    dispatch(fetchQuestBookingAction(currentId as string))
      .unwrap()
      .then((bookingPlaces) => {
        if (isMounted) {
          setBookingPlace(bookingPlaces[0]);
        }
      })
      .catch((rejectedValue) => {
        if (rejectedValue === 'NOT_FOUND') {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentId, dispatch]);

  if (questBookingPlacesStatus === RequestStatus.Loading || !questBookingPlaces.length || !currentBookingPlace) {
    return <Loader />;
  }


  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/img/content/maniac/maniac-bg-size-m.webp, /img/content/maniac/maniac-bg-size-m@2x.webp 2x" /><img src="/img/content/maniac/maniac-bg-size-m.jpg" srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">{currentQuest?.title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <div className="map__container"><Map questBookingPlaces={questBookingPlaces} activePlace={currentBookingPlace} onActiveBookingPlaceChange={handleActiveBookingPlaceChange}/></div>
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: {currentBookingPlace.location.address}</p>
          </div>
        </div>
        <BookingForm currentBookingPlace={currentBookingPlace} currentQuest={currentQuest}/>
      </div>
    </main>
  );
}

export default BookingPage;
