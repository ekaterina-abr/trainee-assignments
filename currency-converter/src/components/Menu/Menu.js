import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import coin from '../../images/coin.png';

const Menu = () => (
  <nav className="Menu">
    <ul>
      <li>
        <NavLink exact to="/" activeClassName="active-link" className="menu-link">
          Курсы валют
        </NavLink>
      </li>
      <li>
        <NavLink to="/converter" activeClassName="active-link" className="menu-link">
          Конвертер валют
        </NavLink>
      </li>
    </ul>
    <img src={coin} alt="coin" />
  </nav>
);

export default Menu;
