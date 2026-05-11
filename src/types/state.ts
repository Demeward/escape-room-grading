import { store } from '../store';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../api/api';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
