import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import { CurrencyCard } from '../components/CurrencyCard';
import {Loader} from '../components/Loader';
import {AuthContext} from '../context/AuthContext'

export const MainPage = () => {
  const {request, loading} = useHttp();
  const {token} = useContext(AuthContext);
  const [userIds, setUserIds] = useState([]);

  const getUserExchangesIds = async () => {
    //const userIds = [1, 2, 3,7,8,9,10,11,12];
    const userCurrencies = await request('/api/currency', 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    setUserIds(userCurrencies);
  }

  useEffect(() => {
    getUserExchangesIds();
  }, [])

  if(loading) {
    return <Loader />
  }
  //const data = await gerdata();
  if (!userIds.length) {
    return <p className="center">Добавленных валют пока нет</p>
  }
  return (
    <>
      MainPage
      {userIds.map((currency) => <><CurrencyCard currency={currency} /><br/></>)}
    </>
  )
}