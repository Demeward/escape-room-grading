import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, RequestStatus } from '../../const';
import { Quest, QuestReservation } from '../../types/quest';
import { removeReservedQuest } from './main';


export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Quest[]>(APIRoute.Quests);
    return data;
  },
);

export const fetchReservedQuestsAction = createAsyncThunk<QuestReservation[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReservedQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<QuestReservation[]>(APIRoute.Reservation);
    return data;
  },
);

export const deleteReservedQuestAction = createAsyncThunk<void, string, {
  state: State;
  extra: AxiosInstance;
  dispatch: AppDispatch;
}>(
  'data/deleteReservedQuest',
  async (reservedQuestId, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.delete(`${APIRoute.Reservation}/${reservedQuestId}`);
      dispatch(removeReservedQuest(reservedQuestId));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(RequestStatus.Error);
      }
      throw error;
    }
  },
);
