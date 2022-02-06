import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CROSS_VIA_MARTIX, CURRENCY_DISPLAY, isValidCurrencyPair, calculateRate} from '../reference/constants';
import '../App.css';
import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch, ReactReduxContext, useStore } from 'react-redux'
import { updateCurrencyConverter  } from './currencyReducer'
import { Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CurrencyFormat }  from './currencyText'



const optionLabel = (option) => {
  <Grid container justifyContent="space-between" alignContent="center" alignItems="center" spacing={1}>
    <Grid item md={3} xs={6}>
      <Box
        component="img"
        sx={{
          maxWidth:'100%',
          border: 2,
          borderColor:'#eeeeee',
        }}
        src={option.symbol}/>
    </Grid>
    <Grid item md={3} xs={5}>
      {option.ccy}
    </Grid>
  </Grid>
}

export default function CCYBase(props) {
  const baseCurrency = useSelector((state) => state.converter.baseCurrency)
  const baseAmount = useSelector((state) => state.converter.baseAmount)
  const dispatch = useDispatch()
  const store  = useStore(ReactReduxContext)

  const updateTermsAmount = (state) => {
    
    if (!isValidCurrencyPair(state))  
      props.updateConversionStatus(`Unable to find rate for ${state.baseCurrency}/${state.termsCurrency}`);
    else {
      let rate = 0.0
      rate = calculateRate(state.baseCurrency, state.termsCurrency) 
      props.updateConversionStatus(`1 ${state.baseCurrency} = ${rate.toFixed(4)} ${state.termsCurrency}`);
      let newAmount = rate * parseFloat(state.baseAmount)
      return { 
        baseCurrency: state.baseCurrency,
        termsCurrency: state.termsCurrency,
        baseAmount: state.baseAmount, //state.termsAmount *2,
        termsAmount: newAmount
      }
    }
    return { 
      baseCurrency: state.baseCurrency,
      termsCurrency: state.termsCurrency,
      baseAmount: state.baseAmount, //state.termsAmount *2,
      termsAmount: 0.0
    }
  }

  const handleCurrencyChange = (event, val) => {
    let currentState = store.getState()
    let newState = updateTermsAmount({...currentState.converter, baseCurrency:val})
    dispatch(updateCurrencyConverter(newState))
  };

  const handleAmountChange = (event) => {
    let currentState = store.getState()
    let newState = updateTermsAmount({...currentState.converter, baseAmount:event.target.value})
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
          value={baseCurrency}
          disablePortal
          id="from-currency-auto"
          options={CURRENCY_DISPLAY.map(c => c.ccy)}
          // freeSolo
          sx={{ width: '100%' }}
          renderInput={(params) => {
            return <TextField   {...params} label="From Currency" />
          }}
        />
        <TextField 
              onChange={handleAmountChange} 
              value={baseAmount} 
              className={'CurrencySelector'} 
              id="from-currency-text" 
              name="from-currency-text"
              label="Amount" 
              variant="outlined" 
              InputProps={{
                inputComponent: CurrencyFormat,
                inputProps:{currency:baseCurrency}
              }}
              />
      </FormControl>
      </Paper>
    </Box>
  );
}