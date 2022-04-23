import { mdiCurrencyUsd, mdiCurrencyEur, mdiCurrencyIls } from '@mdi/js';
import {
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Typography,
  Grid,
  FormControl,
} from '@mui/material';
import { CurrencyProps, SupportedCurrencies } from '../types';

export function Currency(props: CurrencyProps) {
  const { label, labelId, onChange, value, validate } = props;
  const isValid = validate(value);
  return (
    <FormControl sx={{ width: '45%' }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value || ''}
        label={label}
        onChange={onChange}
      >
        <MenuItem value={SupportedCurrencies.USD}>
          <Grid container sx={{ verticalAlign: 'center' }}>
            <SvgIcon>
              <path d={mdiCurrencyUsd} />
            </SvgIcon>
            <Typography marginLeft={2}>{SupportedCurrencies.USD}</Typography>
          </Grid>
        </MenuItem>
        <MenuItem value={SupportedCurrencies.EUR}>
          <Grid container sx={{ verticalAlign: 'center' }}>
            <SvgIcon>
              <path d={mdiCurrencyEur} />
            </SvgIcon>
            <Typography marginLeft={2}>{SupportedCurrencies.EUR}</Typography>
          </Grid>
        </MenuItem>
        <MenuItem value={SupportedCurrencies.ILS}>
          <Grid container sx={{ verticalAlign: 'center' }}>
            <SvgIcon>
              <path d={mdiCurrencyIls} />
            </SvgIcon>
            <Typography marginLeft={2}>{SupportedCurrencies.ILS}</Typography>
          </Grid>
        </MenuItem>
      </Select>
      {!isValid && <Typography sx={{color: 'red'}}>Provide a valid currency</Typography>}
    </FormControl>
  );
}
