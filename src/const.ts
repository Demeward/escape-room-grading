export enum AppRoute {
  Main = '/',
  Login = '/login',
  Reservation = '/reservation',
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  Contacts = '/contacts',
  NotFound = '*',
}

export enum APIRoute {
  Quests = '/quest',
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Main = 'MAIN',
  User = 'USER',
  Quest = 'QUEST'
}

export enum AuthorizationStatus {
  Auth = 'AUTHORIZED',
  NotAuth = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN'
}

export enum QuestType {
  All = 'all',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi'
}

export const QuestTypeMap = new Map([
  [QuestType.All, 'Все квесты'],
  [QuestType.Adventures, 'Приключения'],
  [QuestType.Horror, 'Ужасы'],
  [QuestType.Mystic, 'Мистика'],
  [QuestType.Detective, 'Детектив'],
  [QuestType.SciFi, 'Sci-Fi']
]);

export enum QuestLevel {
  Any = 'any',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const QuestLevelMap = new Map([
  [QuestLevel.Any, 'Любой'],
  [QuestLevel.Easy, 'Лёгкий'],
  [QuestLevel.Medium, 'Средний'],
  [QuestLevel.Hard, 'Сложный'],
]);

export enum QuestDate {
  Today = 'today',
  Tomorrow = 'tomorrow'
}

export const QuestDateMap = new Map([
  [QuestDate.Today, 'сегодня'],
  [QuestDate.Tomorrow, 'завтра'],
]);

export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export const StatusCode = {
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404
} as const;

export const ERROR_MESSAGE_TIMEOUT = 3000;
