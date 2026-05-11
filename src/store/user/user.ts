import { AuthorizationStatus } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthorizationAction, loginAction, logoutAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';


export type UserState = {
  authorizationStatus: AuthorizationStatus;
}


const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorizationAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthorizationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      });
  }
});

export const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const selectAuthorizationChecked = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
