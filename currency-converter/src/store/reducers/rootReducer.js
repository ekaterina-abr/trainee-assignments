import { UPDATE_CURRENCY, SET_USER_CURR, SET_CURR_DATE } from '../actions/actionTypes';

const initialState = {
  currencies: ['RUB', 'USD', 'EUR', 'GBP'],
  user_curr: 'RUB',
  currency_values: {
    RUB: [0, 0, 0],
    USD: [0, 0, 0],
    EUR: [0, 0, 0],
    GBP: [0, 0, 0],
  },
  currency_date: '',
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return {
        ...state,
        currency_values: action.values,
      };
    case SET_USER_CURR:
      return {
        ...state,
        user_curr: action.value,
      };
    case SET_CURR_DATE:
      return {
        ...state,
        currency_date: action.value,
      };
    default:
      return state;
  }
}
