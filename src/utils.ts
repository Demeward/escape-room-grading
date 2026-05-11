import { QuestLevel, QuestType } from './const';
import { Quest, QuestBooking, QuestLocation } from './types/quest';

export const filterQuests = (quests: Quest[], questTypeFilter: QuestType, questLevelFilter: QuestLevel): Quest[] => quests.filter((quest) =>
  (questTypeFilter === QuestType.All || questTypeFilter === quest.type)
  &&
  (questLevelFilter === QuestLevel.Any || questLevelFilter === quest.level));

export const isBookingPlace = (place: QuestBooking | QuestLocation): place is QuestBooking => 'id' in place;

