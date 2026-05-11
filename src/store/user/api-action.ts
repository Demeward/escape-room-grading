import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { State } from '../../types/state';
import { APIRoute, } from '../../const';
import { CredentialsData, UserData } from '../../types/auth';
import { saveToken, dropToken } from '../../api/token';
import { toast } from 'react-toastify';


export const checkAuthorizationAction = createAsyncThunk<UserData, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthorization',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, CredentialsData, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      return data;
    } catch (error) {
      if(error instanceof AxiosError && error.response) {
        toast.warn('Не удалось авторизоваться');
      }
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
