import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from '../components/currencyReducer'


export default configureStore({
  reducer: {
    converter: currencyReducer,
  },
})