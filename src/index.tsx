import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { ERROR_MESSAGE_TIMEOUT } from './const';
import { ToastContainer } from 'react-toastify';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { fetchQuestsAction } from './store/main/api-action';
import { checkAuthorizationAction } from './store/user/api-action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorizationAction());
store.dispatch(fetchQuestsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer position='top-center' autoClose={ERROR_MESSAGE_TIMEOUT} hideProgressBar />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
