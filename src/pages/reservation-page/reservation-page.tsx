import { RequestStatus } from '../../const';
import { useEffect } from 'react';
import Loader from '../../components/loader/loader';
import LoadingFailed from '../../components/loading-failed/loading-failed';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectReservedQuests, selectReservedQuestsStatus } from '../../store/main/main';
import { fetchReservedQuestsAction } from '../../store/main/api-action';
import QuestCard from '../../components/quest-card/quest-card';


function ReservationPage() {
  const dispatch = useAppDispatch();
  const reservedQuests = useAppSelector(selectReservedQuests);
  const reservedQuestsStatus = useAppSelector(selectReservedQuestsStatus);

  useEffect(() => {
    if(reservedQuestsStatus === RequestStatus.Idle) {
      dispatch(fetchReservedQuestsAction());
    }
  }, [dispatch, reservedQuestsStatus]);


  if (reservedQuestsStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  if (reservedQuestsStatus === RequestStatus.Error) {
    return <LoadingFailed message={'Не удалось загрузить забронированные квесты'} />;
  }

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/img/content/maniac/maniac-bg-size-m.webp, /img/content/maniac/maniac-bg-size-m@2x.webp 2x" /><img src="/img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        {reservedQuests.length ?
          <div className="cards-grid">
            {reservedQuests.map((reservedQuest) => <QuestCard key={reservedQuest.id} reservedQuest={reservedQuest} quest={reservedQuest.quest} />)}
          </div>
          : <h2 className="title">У вас нет забронированных квестов</h2>}
      </div>
    </main>
  );
}

export default ReservationPage;
