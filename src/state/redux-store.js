import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from '../components/reducer/CurrencyReducer'


export default configureStore({
  reducer: {
    converter: currencyReducer,
  },
})