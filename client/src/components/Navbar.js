import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()

  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
    <div class="nav-wrapper" style={{padding: '0 2rem'}}>
      <span>Your currencies</span>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/create">Create rate</NavLink></li>
          <li><NavLink to="/main">Your rates</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
      </ul>
    </div>
  </nav>
  );
}