import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { APIRoute, StatusCode, RequestStatus } from '../../const';
import { AxiosError } from 'axios';
import { QuestBooking, QuestBookingPost, QuestFull, QuestReservation } from '../../types/quest';
import { generatePath } from 'react-router-dom';


export const fetchQuestAction = createAsyncThunk<QuestFull, string, {
  state: State;
  extra: AxiosInstance;
  rejectValue: 'NOT_FOUND';
}>(
  'data/fetchQuest',
  async (questId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<QuestFull>(generatePath(APIRoute.Quest, {id: questId}));
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCode.NotFound) {
        return rejectWithValue('NOT_FOUND');
      }
      throw error;
    }
  },
);

export const fetchQuestBookingAction = createAsyncThunk<QuestBooking[], string, {
  state: State;
  extra: AxiosInstance;
  rejectValue: 'NOT_FOUND';
}>(
  'data/fetchQuestBooking',
  async (questId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<QuestBooking[]>(generatePath(APIRoute.Booking, {id: questId}));
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCode.NotFound) {
        return rejectWithValue('NOT_FOUND');
      }
      throw error;
    }
  },
);

export const postQuestBookingAction = createAsyncThunk<QuestReservation, QuestBookingPost, {
  state: State;
  extra: AxiosInstance;
  rejectedValue: unknown;
}>(
  'data/postQuestBooking',
  async ({ date, time, contactPerson, phone, withChildren, peopleCount, placeId, questId }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<QuestReservation>(generatePath(APIRoute.Booking, {id: questId}), { date, time, contactPerson, phone, withChildren, peopleCount, placeId });
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(RequestStatus.Error);
      }
      throw error;
    }
  },
);
