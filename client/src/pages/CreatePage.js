import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import Select from 'react-select'
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';

const options = [
  { value: 'EUR', label: 'EUR' },
  { value: 'USD', label: 'USD' },
  { value: 'BTC', label: 'BTC' }
]

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

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [sourceCur, setStateCur] = useState('');
  const [outputCur, setOutputCur] = useState('');
  const isDisabledTarget = !sourceCur;
  const M = window.M;
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    });
  });

  const handleSourceChange = (e, {action}) => {
    console.log('action')
    console.log(action)
    
    if (action === 'clear') {
      setStateCur(null);
      setOutputCur(null);
      return;
    }
    
    e && setStateCur(e.value);
  }
  const handleOutputChange = (e, {action}) => {
    if (action === 'clear') {
      setOutputCur(null);
      return;
    }
    e && setOutputCur(e.value);
  }

  const pressHandler = async () => {
    const id = currencyList.filter(c => c.inp === sourceCur).filter(x => x.out === outputCur)[0].id;
    try {
      console.log('try');
      const data = await request('/api/currency/generate', 'POST', { descriptionId: id }, {
        Authorization: `Bearer ${auth.token}`
      });
      console.log(data);
      history.push(`/detail/${data.currency._id}`);
    } catch (e) {

    }
  }
  
  return (
    <div className="row">
      CreatePage
      <Select options={options} isClearable placeholder="Select Source Currency" defaultValue={sourceCur} onChange={handleSourceChange}/>
      <Select options={options} isClearable isDisabled={isDisabledTarget} placeholder="Select Output Currency" defaultValue={outputCur} onChange={handleOutputChange}/>
      <a class="waves-effect waves-light btn-large" disabled={!outputCur} onClick={pressHandler}>Button</a>
    </div>
  )
}