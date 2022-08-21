import { useState, useEffect } from 'react';
import { getRates } from './api/ratesApi';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [rates, setRates] = useState([])

  useEffect(() => {
    (async () => {
      setRates(await getRates())
    })()
  }, [])
  useEffect(()=>{
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])
  useEffect(()=>{
    onChangeToPrice(toPrice)
  }, [toCurrency])
  const onChangeFromPrice = (value) => {
    const result = (value / rates[fromCurrency]) * rates[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }
  
  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
