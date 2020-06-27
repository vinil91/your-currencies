import React, { useState, useEffect } from 'react';
import {useHttp} from '../hooks/http.hook';
import {Loader} from './Loader';
import {Link} from 'react-router-dom';


export const CurrencyCard = ({ currency }) => {
  const [exchangeInfo, setExchangeInfo] = useState([]);
  const {loading, request, error, clearError} = useHttp();
  const currencyList = [
    {
      id: 1, inp: 'USD', out: 'RUB', source: 'Exchangeratesapi'
    },
    {
      id: 2, inp: 'RUB', out: 'USD', source: 'Exchangeratesapi'
    },
    {
      id: 3, inp: 'USD', out: 'EUR', source: 'Exchangeratesapi'
    },
    {
      id: 4, inp: 'EUR', out: 'USD', source: 'Exchangeratesapi'
    },
    {
      id: 5, inp: 'RUB', out: 'EUR', source: 'Exchangeratesapi'
    },
    {
      id: 6, inp: 'EUR', out: 'RUB', source: 'Exchangeratesapi'
    },
    {
      id: 7, inp: 'BTC', out: 'USD', source: 'apironeFromBTC'
    },
    {
      id: 8, inp: 'BTC', out: 'EUR', source: 'apironeFromBTC'
    },
    {
      id: 9, inp: 'BTC', out: 'RUB', source: 'apironeFromBTC'
    },
    {
      id: 10, inp: 'USD', out: 'BTC', source: 'apironeToBTC'
    },
    {
      id: 11, inp: 'EUR', out: 'BTC', source: 'apironeToBTC'
    },
    {
      id: 12, inp: 'RUB', out: 'BTC', source: 'apironeToBTC'
    },
  ];
  const getInputCurrency = () => {

  }
  const getOutputCurrency = () => {
    
  }
  const getRate = async (inp, out, source) => {
    let link = '';
    if (source === 'Exchangeratesapi') {
      link = `https://api.exchangeratesapi.io/latest?base=${inp}&symbols=${out}`
      const response = await request(link, 'GET');
      return response.rates[out];
    } else if (source === 'apironeFromBTC') {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      link = `${proxyurl}https://apirone.com/api/v1/ticker?currency=${inp}`
      const response = await request(link, 'GET');
      return response[out]['last'];
    } else if (source === 'apironeToBTC') {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      link = `${proxyurl}https://apirone.com/api/v1/tobtc?currency=${inp}&value=1`
      const response = await request(link, 'GET');
      return response;
    }
    return -1;
  }

  const getExchangeRateInfo = async (id) => {
    const item = currencyList.find(currencyItem => currencyItem.id === id);
    const { inp, out, source } = item;
    const rate = await getRate(inp, out, source);
    setExchangeInfo({ inp, out, rate })
  }

  useEffect(() => {
    getExchangeRateInfo(currency.descriptionId);
  }, [])

  if(loading) {
    return <Loader />
  }

  return (
    <>{!loading && <div>
      <div>{currency.date}</div>
      <div>{exchangeInfo.inp}</div>
      <div>{exchangeInfo.out}</div>
      <div>{exchangeInfo.rate}</div>
      <Link to={`/detail/${currency._id}`}>Подробнее</Link>
    </div>}</>
  );
}