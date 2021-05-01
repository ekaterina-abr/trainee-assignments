import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

function loadState() {
  const userCurr = localStorage.getItem('user_curr');
  if (!userCurr) return undefined;
  return {
    currencies: ['RUB', 'USD', 'EUR', 'GBP'],
    user_curr: userCurr,
    currency_values: {
      RUB: [0, 0, 0],
      USD: [0, 0, 0],
      EUR: [0, 0, 0],
      GBP: [0, 0, 0],
    },
    currency_date: '',
  };
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const oldState = loadState();

const store = createStore(rootReducer, oldState, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;
