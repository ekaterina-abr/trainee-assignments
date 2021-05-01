import { UPDATE_CURRENCY, SET_CURR_DATE } from './actionTypes';

function setCurrValues(currencyValues) {
  return {
    type: UPDATE_CURRENCY,
    values: currencyValues,
  };
}

function setCurrDate(date) {
  return {
    type: SET_CURR_DATE,
    value: date,
  };
}

export default function updateCurrency() {
  let currencyValues;
  return (dispatch) => {
    fetch('https://www.cbr-xml-daily.ru/daily.xml')
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => {
        const USDInRUB = +parseFloat(
          data.querySelector('Valute[ID="R01235"] Value').innerHTML.replace(',', '.'),
        ).toFixed(2);
        const EURInRUB = +parseFloat(
          data.querySelector('Valute[ID="R01239"] Value').innerHTML.replace(',', '.'),
        ).toFixed(2);
        const GBPInRUB = +parseFloat(
          data.querySelector('Valute[ID="R01035"] Value').innerHTML.replace(',', '.'),
        ).toFixed(2);
        const currDate = data.querySelector('ValCurs').getAttribute('Date');
        currencyValues = {
          RUB: [USDInRUB, EURInRUB, GBPInRUB],
          USD: [+(1 / USDInRUB).toFixed(2), +(EURInRUB / USDInRUB).toFixed(2), +(GBPInRUB / USDInRUB).toFixed(2)],
          EUR: [+(1 / EURInRUB).toFixed(2), +(USDInRUB / EURInRUB).toFixed(2), +(GBPInRUB / EURInRUB).toFixed(2)],
          GBP: [+(1 / GBPInRUB).toFixed(2), +(USDInRUB / GBPInRUB).toFixed(2), +(EURInRUB / GBPInRUB).toFixed(2)],
        };
        dispatch(setCurrValues(currencyValues));
        dispatch(setCurrDate(currDate));
      })
      .catch((err) => alert(err));
  };
}
