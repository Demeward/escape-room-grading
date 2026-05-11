import { Quest, QuestReservation } from '../../types/quest';
import { State } from '../../types/state';
import { AppRoute, RequestStatus, NameSpace } from '../../const';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestsAction, fetchReservedQuestsAction } from './api-action';


export type QuestsState = {
  quests: Quest[];
  reservedQuests: QuestReservation[];
  questsStatus: RequestStatus;
  reservedQuestsStatus: RequestStatus;
}

const initialState: QuestsState = {
  quests: [],
  reservedQuests: [],
  questsStatus: RequestStatus.Idle,
  reservedQuestsStatus: RequestStatus.Idle,
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    addReservedQuest: (state, action: PayloadAction<QuestReservation>) => {
      state.reservedQuests = [...state.reservedQuests, action.payload];
    },
    removeReservedQuest: (state, action: PayloadAction<string>) => {
      state.reservedQuests = state.reservedQuests.filter((reservedQuest) => reservedQuest.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.questsStatus = RequestStatus.Loading;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action: PayloadAction<Quest[]>) => {
        state.questsStatus = RequestStatus.Success;
        state.quests = action.payload;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.questsStatus = RequestStatus.Error;
      })
      .addCase(fetchReservedQuestsAction.pending, (state) => {
        state.reservedQuestsStatus = RequestStatus.Loading;
      })
      .addCase(fetchReservedQuestsAction.fulfilled, (state, action: PayloadAction<QuestReservation[]>) => {
        state.reservedQuestsStatus = RequestStatus.Success;
        state.reservedQuests = action.payload;
      })
      .addCase(fetchReservedQuestsAction.rejected, (state) => {
        state.reservedQuestsStatus = RequestStatus.Error;
      });
  }
});

export const { addReservedQuest, removeReservedQuest } = mainSlice.actions;

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const selectQuests = (state: Pick<State, NameSpace.Main>): Quest[] => state[NameSpace.Main].quests;

export const selectReservedQuests = (state: Pick<State, NameSpace.Main>): QuestReservation[] => state[NameSpace.Main].reservedQuests;

export const selectQuestsStatus = (state: Pick<State, NameSpace.Main>): RequestStatus => state[NameSpace.Main].questsStatus;

export const selectReservedQuestsStatus = (state: Pick<State, NameSpace.Main>): RequestStatus => state[NameSpace.Main].reservedQuestsStatus;
