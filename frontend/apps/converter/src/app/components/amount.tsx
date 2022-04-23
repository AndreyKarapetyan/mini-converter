import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { FormControl, IconButton, TextField } from '@mui/material';
import { AmountProps } from '../types';

export function Amount(props: AmountProps) {
  const { value, onChange, onClick, validate } = props;
  const isValid = validate(value);
  return (
    <FormControl>
      <TextField
        autoComplete="off"
        error={!isValid}
        label="Amount in cents"
        value={value || ''}
        onChange={onChange}
        helperText={!isValid && 'Provide a number'}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onClick}>
              <CurrencyExchangeIcon />
            </IconButton>
          ),
        }}
      />
    </FormControl>
  );
}
