import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Provider } from 'react-redux'
import store from '../../state/redux-store'


test('Currency converter text', () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
  const currencyText = screen.getByText(/Currency Converter/i);
});
