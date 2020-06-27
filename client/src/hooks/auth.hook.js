import {useState, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [readyAuth, setReadyAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  console.log('1')
  const login = (jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  };
  
  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  };
  console.log('2')

  useEffect(() => {
    console.log('3')
    const data = JSON.parse(localStorage.getItem(storageName))
    console.log('4')
    if (data && data.token) {
      login(data.token, data.userId)
    }
    console.log('5')
    setReadyAuth(true);
    console.log('6')
  }, []);

  return { login, logout, token, userId, readyAuth }
}