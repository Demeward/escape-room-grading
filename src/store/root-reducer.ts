import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { mainSlice } from './main/main';
import { questSlice } from './quest/quest';
import { userSlice } from './user/user';


export const rootReducer = combineReducers({
  [NameSpace.Main]: mainSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
  [NameSpace.User]: userSlice.reducer
});
