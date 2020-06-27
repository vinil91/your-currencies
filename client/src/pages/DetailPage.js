import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {Loader} from '../components/Loader';
import {AuthContext} from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook';
import { CurrencyCard } from '../components/CurrencyCard';

export const DetailPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [currency, setCurrency] = useState(null);
  const curId = useParams().id


  const getCurrency = async () => {
    try {
      const curData = await request(`/api/currency/${curId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCurrency(curData)
    } catch(e) {

    }
  }

  useEffect(() => { getCurrency();}, [])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      {currency && <CurrencyCard currency={currency} />}
    </>
  )
}