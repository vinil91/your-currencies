import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css';
import {BrowserRouter} from 'react-router-dom'
import { useRoutes } from './routes'
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext';

function App() {
  const {token, login, logout, userId, readyAuth } = useAuth()
  console.log('7')
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!readyAuth) {
    return (
      <Loader />
    )
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = window.M.FormSelect.init(elems);
});
export default App;
