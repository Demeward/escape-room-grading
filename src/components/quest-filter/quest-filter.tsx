import { QuestType, QuestTypeMap, QuestLevel, QuestLevelMap } from '../../const';

type QuestFilterProps = {
  typeFilter: QuestType;
  levelFilter: QuestLevel;
  onQuestTypeChange: (arg: QuestType) => void;
  onQuestLevelChange: (arg: QuestLevel) => void;
}

function QuestFilter({ typeFilter, levelFilter, onQuestTypeChange, onQuestLevelChange }: QuestFilterProps) {
  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {
            Object.values(QuestType).map((value) => {
              let questIcon;

              if (value === QuestType.All) {
                questIcon = 'all-quests';
              } else if (value === QuestType.Adventures) {
                questIcon = 'adventure';
              } else {
                questIcon = value;
              }

              return (
                <li className="filter__item" key={value}>
                  <input type="radio" name="type" id={value} onChange={() => onQuestTypeChange(value)} checked={value === typeFilter} />
                  <label className="filter__label" htmlFor={value}>
                    <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                      <use xlinkHref={`#icon-${questIcon}`}></use>
                    </svg><span className="filter__label-text">{QuestTypeMap.get(value)}</span>
                  </label>
                </li>
              );
            }
            )

          }
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {
            Object.values(QuestLevel).map((value) => (
              <li className="filter__item" key={value}>
                <input type="radio" name="level" id={value} onChange={() => onQuestLevelChange(value)} checked={value === levelFilter} />
                <label className="filter__label" htmlFor={value}><span className="filter__label-text">{QuestLevelMap.get(value)}</span>
                </label>
              </li>
            ))
          }
        </ul>
      </fieldset>
    </form>
  );
}

export default QuestFilter;
