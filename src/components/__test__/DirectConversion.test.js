import { render, screen, within, fireEvent } from '@testing-library/react';
import App from '../../App';
import { Provider } from 'react-redux'
import store from '../../state/redux-store'
import { navigateToCurrency, findReverseRate, findRate, convertToDisplay} from './utils';
import "@testing-library/jest-dom/extend-expect"



test('Test reverse currency rate', () => {
  const container = render(<Provider store={store}>
    <App />
  </Provider>);

  let ccy1 = 'USD'
  let ccy2 = 'NZD'
  let amount = 1500

  navigateToCurrency(ccy1, 'from-currency-auto')
  navigateToCurrency(ccy2, 'to-currency-auto')

  let rate = findReverseRate(ccy1, ccy2)

  const rateText = screen.getByTestId('conversion-rate')
  console.log(rateText.innerHTML)
  expect(rateText.innerHTML).toEqual(`1 ${ccy1} = ${rate.toFixed(4)} ${ccy2}`) 


  const fromAmountText = container.getByLabelText(/From Amount/i)
  fireEvent.change(fromAmountText, { target: { value: amount } })

  const toAmountText = container.getByLabelText(/To Amount/i)
  let formattedAmount = convertToDisplay(amount * rate, ccy2)
  console.log(formattedAmount)
  expect(toAmountText.value).toEqual(formattedAmount)

});

