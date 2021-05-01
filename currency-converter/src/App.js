import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from './components/Menu/Menu';
import './App.scss';
import Currency from './containers/Currency/Currency';
import Converter from './containers/Converter/Converter';
import updateCurrency from './store/actions/updateCurrency';

class App extends Component {
  componentDidMount() {
    const { updateCurrencyFunc } = this.props;
    updateCurrencyFunc();
    setInterval(updateCurrencyFunc, 300000);
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route path="/converter" component={Converter} />
          <Route exact path="/" component={Currency} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  updateCurrencyFunc: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateCurrencyFunc: () => dispatch(updateCurrency()),
  };
}

export default connect(null, mapDispatchToProps)(withRouter(App));
