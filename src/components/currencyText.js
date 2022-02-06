import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {CURRENCY_DISPLAY} from '../reference/constants'


export const CurrencyFormat = React.forwardRef(function CurrencyFormat(props, ref) {
    const { onChange, currency, ...other } = props;
    // let currencyFound = CURRENCY_DISPLAY.find(c => c.ccy === currency) !== undefined ? true : false;
    let currencyFound = CURRENCY_DISPLAY.find(c => c.ccy === currency)
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value //currencyFound ? parseFloat(values.value).toFixed(currencyFound.decimals) : 0,
            },
          });
        }}
        decimalScale={currencyFound ? currencyFound.decimals : 0}
        thousandSeparator
        isNumericString
        prefix={ currencyFound ? currencyFound.symbol + ' ' : '' }
      />
    );
  });

