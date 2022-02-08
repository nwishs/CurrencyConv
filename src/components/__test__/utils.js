import React from 'react'
import {CURRENCY_DISPLAY, CONVERSION_RATES} from '../../reference/constants';
import { render, screen, within, fireEvent } from '@testing-library/react';
import currency from 'currency.js'



export const navigateToCurrency = (curr, currencyAuto) => {
  const fromCurrencyAuto = screen.getByTestId(currencyAuto);
  const input = within(fromCurrencyAuto).getByRole('textbox')
  
  fromCurrencyAuto.focus()
  fireEvent.keyDown(fromCurrencyAuto, { key: 'ArrowDown' })
  fireEvent.keyDown(fromCurrencyAuto, { key: 'Enter' })
  //expect(input.value).toEqual('USD') 


  while(input.value !== curr) {
    fireEvent.keyDown(fromCurrencyAuto, { key: 'ArrowDown' })
    fireEvent.keyDown(fromCurrencyAuto, { key: 'ArrowDown' })
    fireEvent.keyDown(fromCurrencyAuto, { key: 'Enter' })
    //console.log(input.value)
  }  
}

export const convertToDisplay = (amount, ccy) => {
  let selectedCurreny = CURRENCY_DISPLAY.find(x => x.ccy === ccy)
  console.log(currency(amount, { symbol: selectedCurreny.symbol, precision: selectedCurreny.decimals }).format())
  return currency(amount, { symbol: selectedCurreny.symbol, precision:selectedCurreny.decimals }).format();
  //return formattedAmount
  //`${CURRENCY_DISPLAY.find(x => x.ccy === ccy).symbol} ${amount.toFixed(CURRENCY_DISPLAY.find(x => x.ccy === ccy).decimals)}`
}

export const findRate = (ccy1, ccy2) => {
  return CONVERSION_RATES.find( x => x.base === ccy1 && x.terms === ccy2).rate;
}


export const findReverseRate = (ccy1, ccy2) => {
  return 1 / CONVERSION_RATES.find( x => x.terms === ccy1 && x.base === ccy2).rate;
}