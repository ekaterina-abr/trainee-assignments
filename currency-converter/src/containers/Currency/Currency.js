import React, { Component } from 'react';
import './Currency.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setUserCurr from '../../store/actions/setUserCurr';

class Currency extends Component {
  setUserCurrencyFunc = (event) => {
    const { currencies, setUserCurrency } = this.props;
    const userCurr = currencies[event.target.options.selectedIndex];
    setUserCurrency(userCurr);
  };

  render() {
    const { currencies, userCurr, currencyValues, currDate } = this.props;
    const currNames = currencies.filter((curr) => curr !== userCurr);
    return (
      <div className="CurrencyWrapper">
        <div className="Currency">
          <h2>Текущий курс валют</h2>
          <p className="currency-date">Состояние на {currDate}</p>
          <div className="choose-currency">
            <h3>Валюта:</h3>
            <select name="currency-selector" defaultValue={userCurr} onChange={this.setUserCurrencyFunc}>
              {currencies.map((curr) => (
                <option key={`option-${curr}`} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <p className="currency-values">
            {currNames.map((curr, index) => (
              <span key={`curr-${curr}`}>
                1 {curr} = {currencyValues[userCurr][index]} {userCurr}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }
}

Currency.propTypes = {
  currencyValues: PropTypes.objectOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  userCurr: PropTypes.string.isRequired,
  setUserCurrency: PropTypes.func.isRequired,
  currDate: PropTypes.string,
};

Currency.defaultProps = {
  currDate: '',
};

function mapStateToProps(state) {
  return {
    currencyValues: state.currency_values,
    currencies: state.currencies,
    userCurr: state.user_curr,
    currDate: state.currency_date,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserCurrency: (userCurr) => dispatch(setUserCurr(userCurr)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
