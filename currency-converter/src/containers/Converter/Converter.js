import React, { Component } from 'react';
import './Converter.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: '',
      isInputTouched: false,
      showResult: false,
      result: {
        inCurrName: '',
        outCurrName: '',
        inCurrValue: 0,
        outCurrValue: 0,
      },
    };
  }

  onChangeInputString = (event) => {
    this.setState({
      inputString: event.target.value,
      isInputTouched: true,
    });
  };

  calculateCurrency = (event) => {
    event.preventDefault();
    const { inputString } = this.state;
    const { currencies, currencyValues } = this.props;
    const inputArr = inputString.trim().toUpperCase().split(' ');
    const outCurrNames = currencies.filter((curr) => curr !== inputArr[3]);
    const outCurrValue = parseFloat(inputArr[0]) * currencyValues[inputArr[3]][outCurrNames.indexOf(inputArr[1])];

    this.setState({
      showResult: true,
      result: {
        inCurrName: inputArr[1],
        outCurrName: inputArr[3],
        inCurrValue: parseFloat(inputArr[0]),
        outCurrValue,
      },
    });
  };

  validateInput = (str) => {
    const { currencies } = this.props;
    const { isInputTouched } = this.state;
    let outCurrNames;
    let rightInput = true;
    const inputArr = str.trim().toUpperCase().split(' ');
    if (inputArr.length !== 4) rightInput = false;
    else {
      for (let i = 0; i < inputArr.length; i += 1) {
        if (i === 0 && !/[0-9]+([.,][0-9]+)?/.test(parseFloat(inputArr[i]))) {
          rightInput = false;
          break;
        }
        if (i === 2 && inputArr[i] !== 'IN') {
          rightInput = false;
          break;
        }
        if (i === 1) {
          if (currencies.indexOf(inputArr[i]) === -1) {
            rightInput = false;
            break;
          } else {
            outCurrNames = currencies.filter((curr) => curr !== inputArr[i]);
          }
        }
        if (i === 3 && outCurrNames.indexOf(inputArr[i]) === -1) {
          rightInput = false;
        }
      }
    }
    if (isInputTouched && !rightInput) return false;
    return true;
  };

  render() {
    const { inputString, isInputTouched, result, showResult } = this.state;
    const cls = this.validateInput(inputString) === true ? '' : 'not-valid';
    return (
      <div className="ConverterWrapper">
        <div className="Converter">
          <h2>Конвертер валют</h2>
          <form className="convert-currency">
            <p>
              <span className="converter-descr">Введите строку вида &apos;10 usd in rub&apos;:</span>
              <span className="converter-comment">(Допустимые валюты: rub, usd, eur, gbp)</span>
            </p>
            <input
              type="text"
              placeholder="10 usd in rub"
              name="converter-input"
              onChange={this.onChangeInputString}
              className={cls}
            />
            <button
              type="submit"
              onClick={this.calculateCurrency}
              disabled={!this.validateInput(inputString) || !isInputTouched}
            >
              Рассчитать
            </button>
          </form>
          {showResult === true ? (
            <p className="converter-result">
              {result.inCurrValue} {result.inCurrName}&nbsp; = &nbsp;
              {result.outCurrValue} {result.outCurrName}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

Converter.propTypes = {
  currencyValues: PropTypes.objectOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    currencyValues: state.currency_values,
    currencies: state.currencies,
  };
}

export default connect(mapStateToProps)(Converter);
