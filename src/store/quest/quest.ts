import { QuestBooking, QuestFull } from '../../types/quest';
import { State } from '../../types/state';
import { RequestStatus, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestAction, fetchQuestBookingAction, postQuestBookingAction } from './api-action';


export type QuestState = {
  currentQuest: QuestFull | null;
  questBookingPlaces: QuestBooking[] | [];
  questStatus: RequestStatus;
  questBookingPlacesStatus: RequestStatus;
  questBookingStatus: RequestStatus;
}

const initialState: QuestState = {
  currentQuest: null,
  questBookingPlaces: [],
  questStatus: RequestStatus.Idle,
  questBookingPlacesStatus: RequestStatus.Idle,
  questBookingStatus: RequestStatus.Idle
};

export const questSlice = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestAction.pending, (state) => {
        state.questStatus = RequestStatus.Loading;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action: PayloadAction<QuestFull>) => {
        state.questStatus = RequestStatus.Success;
        state.currentQuest = action.payload;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.questStatus = RequestStatus.Error;
      })
      .addCase(fetchQuestBookingAction.pending, (state) => {
        state.questBookingPlacesStatus = RequestStatus.Loading;
      })
      .addCase(fetchQuestBookingAction.fulfilled, (state, action: PayloadAction<QuestBooking[]>) => {
        state.questBookingPlacesStatus = RequestStatus.Success;
        state.questBookingPlaces = action.payload;
      })
      .addCase(fetchQuestBookingAction.rejected, (state) => {
        state.questBookingPlacesStatus = RequestStatus.Error;
      })
      .addCase(postQuestBookingAction.pending, (state) => {
        state.questBookingStatus = RequestStatus.Loading;
      })
      .addCase(postQuestBookingAction.fulfilled, (state) => {
        state.questBookingStatus = RequestStatus.Success;
      })
      .addCase(postQuestBookingAction.rejected, (state) => {
        state.questBookingStatus = RequestStatus.Error;
      });
  }
});

export const selectCurrentQuest = (state: Pick<State, NameSpace.Quest>): QuestFull | null => state[NameSpace.Quest].currentQuest;

export const selectQuestStatus = (state: Pick<State, NameSpace.Quest>): RequestStatus => state[NameSpace.Quest].questStatus;

export const selectQuestBookingPlaces = (state: Pick<State, NameSpace.Quest>): QuestBooking[] => state[NameSpace.Quest].questBookingPlaces;

export const selectQuestBookingPlacesStatus = (state: Pick<State, NameSpace.Quest>): RequestStatus => state[NameSpace.Quest].questBookingPlacesStatus;

export const selectQuestBookingStatus = (state: Pick<State, NameSpace.Quest>): RequestStatus => state[NameSpace.Quest].questBookingStatus;
