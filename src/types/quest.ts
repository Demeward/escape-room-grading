import { QuestType, QuestLevel, QuestDate } from '../const';

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: number[];
}

export interface QuestFull extends Quest {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type QuestBooking = {
  id: string;
  location: QuestLocation;
  slots: {
    today: QuestSlot[];
    tomorrow: QuestSlot[];
  };
}

export type QuestBookingPost = {
  date: QuestDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
  questId: string;
}

export type QuestReservation = {
  date: QuestDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: QuestLocation;
  quest: Quest;
}

export type QuestLocation = {
  address: string;
  coords: number[];
}

export type QuestSlot = {
  time: string;
  isAvailable: boolean;
}
