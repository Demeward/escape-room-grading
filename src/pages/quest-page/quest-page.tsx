import { useEffect } from 'react';
import { useParams, Link, generatePath, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, QuestLevelMap, QuestTypeMap, RequestStatus } from '../../const';
import { selectCurrentQuest, selectQuestStatus } from '../../store/quest/quest';
import { fetchQuestAction } from '../../store/quest/api-action';
import Loader from '../../components/loader/loader';


function QuestPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id: currentId} = useParams();
  const currentQuest = useAppSelector(selectCurrentQuest);
  const questStatus = useAppSelector(selectQuestStatus);

  useEffect(() => {
    dispatch(fetchQuestAction(currentId as string))
      .unwrap()
      .catch((rejectedValue) => {
        if (rejectedValue === 'NOT_FOUND') {
          navigate(AppRoute.NotFound);
        }
      });
  }, [currentId, dispatch, navigate]);

  if(questStatus === RequestStatus.Loading || !currentQuest) {
    return <Loader />;
  }

  const { id, title, description, type, level, peopleMinMax, previewImg, previewImgWebp, coverImg, coverImgWebp } = currentQuest;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${coverImgWebp} 2x`} /><img src={previewImg} srcSet={`${coverImg} 2x`} width="1366" height="768" alt="" />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{QuestTypeMap.get(type)}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>{peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>{QuestLevelMap.get(level)}
            </li>
          </ul>
          <p className="quest-page__description">{description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={generatePath(AppRoute.Booking, {id})}>Забронировать</Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
