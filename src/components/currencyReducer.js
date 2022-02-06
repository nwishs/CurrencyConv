import { createSlice } from '@reduxjs/toolkit'

export const currencyReducer = createSlice({
  name: 'converter',
  initialState: {
    baseCurrency:'USD',
    termsCurrency:'USD',
    baseAmount:0.00,
    termsAmount:0.00,
    fromUpdate:false,
    toUpdate:false
  },
  reducers: {
    updateCurrencyConverter:(state, action) => {
      
      state.baseCurrency = action.payload.baseCurrency
      state.baseAmount = action.payload.baseAmount
      state.termsCurrency = action.payload.termsCurrency
      state.termsAmount = action.payload.termsAmount
     },
 
  },
})


export const { updateCurrencyConverter } = currencyReducer.actions

export default currencyReducer.reducer