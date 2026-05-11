import { generatePath, Link } from 'react-router-dom';
import { Quest, QuestReservation } from '../../types/quest';
import { AppRoute, QuestLevelMap, QuestDateMap, QuestDate } from '../../const';
import { useAppDispatch } from '../../hooks';
import { deleteReservedQuestAction } from '../../store/main/api-action';

type QuestCardProps = {
  quest: Quest;
  reservedQuest?: QuestReservation;
}

function QuestCard({quest, reservedQuest}: QuestCardProps) {
  const dispatch = useAppDispatch();
  const {id, title, level, peopleMinMax, previewImg, previewImgWebp} = quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}`} /><img src={previewImg} srcSet="img/content/crypt/crypt-size-s@2x.jpg 2x" width="344" height="232" alt="Мужчина в клетке в подземелье." />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper"><Link className="quest-card__link" to={generatePath(AppRoute.Quest, {id})}>{title}</Link>
          {reservedQuest && <span className="quest-card__info">{`[${QuestDateMap.get(reservedQuest.date) as QuestDate},`}&nbsp;{`${reservedQuest.time}. ${reservedQuest.location.address}]`}</span>}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{reservedQuest ? `${reservedQuest.peopleCount}\u00A0чел` : `${peopleMinMax[0]}\u2013${peopleMinMax[1]}\u00A0чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{QuestLevelMap.get(level)}
          </li>
        </ul>
        {reservedQuest && <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={() => void dispatch(deleteReservedQuestAction(reservedQuest.id))}>Отменить</button>}
      </div>
    </div>
  );
}

export default QuestCard;
