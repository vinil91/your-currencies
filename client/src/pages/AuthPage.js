import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext';


export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '', password: ''
  });
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, clearError, message])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row" style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className="col s6 offset-s3">
        <div className="card white" style={{boxShadow: 'none'}}>
          <div className="card-content black-text">
            <span className="card-title center">Authorization</span>
            <div>

              <div className="input-field">
                <input
                  autoComplete="off"
                  placeholder="Enter e-mail:"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input center"
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password:"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input center"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>

            </div>
          </div>
          <div className="card-action center" style={{borderTop: '0', paddingTop: '0'}}>
            <button
              className="btn red lighten-1"
              style={{marginRight: 10}}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}