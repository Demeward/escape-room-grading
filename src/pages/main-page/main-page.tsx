import { useCallback, useMemo, useState } from 'react';
import { QuestType, QuestLevel, RequestStatus } from '../../const';
import QuestCard from '../../components/quest-card/quest-card';
import QuestFilter from '../../components/quest-filter/quest-filter';
import { useAppSelector } from '../../hooks';
import { selectQuests, selectQuestsStatus } from '../../store/main/main';
import { filterQuests } from '../../utils';

function MainPage() {
  const [questTypeFilter, setQuestTypeFilter] = useState<QuestType>(QuestType.All);
  const [questLevelFilter, setQuestLevelFilter] = useState<QuestLevel>(QuestLevel.Any);
  const quests = useAppSelector(selectQuests);
  const questsStatus = useAppSelector(selectQuestsStatus);

  const filteredQuests = useMemo(() => filterQuests(quests, questTypeFilter, questLevelFilter), [quests, questTypeFilter, questLevelFilter]);

  const handleQuestTypeChange = useCallback((type: QuestType) => setQuestTypeFilter(type), []);

  const handleQuestLevelChange = useCallback((level: QuestLevel) => setQuestLevelFilter(level), []);

  if(questsStatus === RequestStatus.Error) {
    return (
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Не удалось загрузить список квестов</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </div>
        <div className="page-content__item">
          <QuestFilter typeFilter={questTypeFilter} levelFilter={questLevelFilter} onQuestTypeChange={handleQuestTypeChange} onQuestLevelChange={handleQuestLevelChange}/>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        {filteredQuests.length ?
          <div className="cards-grid">
            {filteredQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}
          </div>
          : <h3 className="title title--size-s">Таких квестов пока нет</h3>}
      </div>
    </main>
  );
}

export default MainPage;
