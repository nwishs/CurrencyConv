import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import '../App.css';
import { useSelector, useDispatch, ReactReduxContext, useStore } from 'react-redux'
import { updateCurrencyConverter  } from './currencyReducer'
import {CROSS_VIA_MARTIX, CURRENCY_DISPLAY, isValidCurrencyPair, calculateRate} from '../reference/constants';
import { CurrencyFormat }  from './currencyText'
import { Autocomplete } from '@mui/material';


export default function CCYTerms(props) {

  const termsCurrency = useSelector((state) => state.converter.termsCurrency)
  const termsAmount = useSelector((state) => state.converter.termsAmount)
  const dispatch = useDispatch()
  const store  = useStore(ReactReduxContext)

  const updateBaseAmount = (state) => {
    if ( !isValidCurrencyPair(state) ) 
      props.updateConversionStatus(`Unable to find rate for ${state.baseCurrency}/${state.termsCurrency}`);
    else {
      let rate = 0.0
      rate = calculateRate(state.termsCurrency, state.baseCurrency) 
      props.updateConversionStatus(`1 ${state.baseCurrency} = ${(1/rate).toFixed(4)} ${state.termsCurrency}`);
      let newAmount = rate * parseFloat(state.termsAmount)
      return { 
        baseCurrency: state.baseCurrency,
        termsCurrency: state.termsCurrency,
        baseAmount: newAmount, 
        termsAmount: state.termsAmount,
      }
    }
    return { 
      baseCurrency: state.baseCurrency,
      termsCurrency: state.termsCurrency,
      baseAmount: 0.0, 
      termsAmount: state.termsAmount,
    }
  }

  const handleCurrencyChange = (event, val) => {
    let currentState = store.getState()
    let newState = updateBaseAmount({...currentState.converter, termsCurrency:val})
    dispatch(updateCurrencyConverter(newState))
  };

  const handleAmountChange = (event) => {
    let currentState = store.getState()
    let newState = updateBaseAmount({...currentState.converter, termsAmount:event.target.value})
    dispatch(updateCurrencyConverter(newState))
  };

  return (
    <Box >
      <Paper  style={{padding:15}} elevation={6} >
      <FormControl fullWidth >
      <Autocomplete
          className="CurrencySelector"
          onChange={handleCurrencyChange} 
          //onInputChange={handleCurrencyChange} 
          value={termsCurrency}
          disablePortal
          id="to-currency-auto"
          options={CURRENCY_DISPLAY.map(c => c.ccy)}
          // freeSolo
          sx={{ width: '100%' }}
          renderInput={(params) => {
            return <TextField   {...params} label="To Currency" />
          }}
        />
        <TextField 
              onChange={handleAmountChange} 
              value={termsAmount} 
              className={'CurrencySelector'} 
              id="to-currency-text" 
              name="to-currency-text"
              label="Amount" 
              variant="outlined" 
              InputProps={{
                inputComponent: CurrencyFormat,
                inputProps:{currency:termsCurrency}
              }}
              />

      </FormControl>
      </Paper>
    </Box>
  );
}