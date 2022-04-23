import { Amount } from '../components/amount';
import { ApiResponse, SupportedCurrencies } from '../types';
import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { Currency } from '../components/currency';
import { useEffect, useState } from 'react';

export function Converter() {
  const [amount, setAmount] = useState<number>();
  const [baseCur, setBaseCur] = useState<SupportedCurrencies>();
  const [quoteCur, setQuoteCur] = useState<SupportedCurrencies>();
  const [shouldConvert, setShouldConvert] = useState(false);
  const [shouldAutoConvert, setShouldAutoConvert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rateData, setRateData] = useState<ApiResponse>();
  const [isError, setError] = useState(false);

  const url = `${process.env.NX_BASE_URL}/quote?amount=${amount}&from_currency_code=${baseCur}&to_currency_code=${quoteCur}`;
  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
    if (shouldAutoConvert) {
      setShouldConvert(true);
    }
  };
  const onBaseCurChange = (e: any) => {
    setBaseCur(e.target.value);
    if (shouldAutoConvert) {
      setShouldConvert(true);
    }
  };
  const onQuoteCurChange = (e: any) => {
    setQuoteCur(e.target.value);
    if (shouldAutoConvert) {
      setShouldConvert(true);
    }
  };
  const onClick = () => {
    setShouldConvert(true);
  };
  const validateAmount = (val: any) => {
    if (shouldConvert || val) {
      return Boolean(Number(val));
    }
    return true;
  }
  const validateCur = (val: any): boolean => {
    if (shouldConvert) {
      return Object.values(SupportedCurrencies).includes(val);
    }
    return true;
  }
  const validateData = () =>
    validateAmount(amount) && validateCur(baseCur) && validateCur(quoteCur);
  const isValidData = validateData();

  useEffect(() => {
    if (shouldConvert && isValidData && !isLoading) {
      setLoading(true);
      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error();
          }
          return resp.json();
        })
        .then((respData) => {
          setRateData(respData);
          setLoading(false);
          setShouldConvert(false);
          setShouldAutoConvert(true);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [isLoading, isValidData, shouldConvert, url]);
  return (
    <Grid
      container
      item
      xs={10}
      sm={7}
      md={5}
      lg={4}
      sx={{
        marginTop: 8,
        marginX: 'auto',
        justifyContent: 'center',
      }}
    >
      {isError ? (
        <Typography component="h1">
          Sorry, we have some server issues
        </Typography>
      ) : (
        <>
          <Amount
            value={amount}
            onChange={onAmountChange}
            onClick={onClick}
            validate={validateAmount}
          />
          <Grid
            container
            sx={{ justifyContent: 'space-between', marginTop: 5 }}
          >
            <Currency
              label="Base"
              labelId="base-currency"
              value={baseCur}
              onChange={onBaseCurChange}
              validate={validateCur}
            />
            <Currency
              label="Quote"
              labelId="quote-currency"
              value={quoteCur}
              onChange={onQuoteCurChange}
              validate={validateCur}
            />
          </Grid>
          {isLoading ? (
            <Stack
              sx={{ width: '100%', color: 'grey.500', marginTop: 3 }}
              spacing={2}
            >
              <LinearProgress color="inherit" />
            </Stack>
          ) : (
            isValidData &&
            rateData && (
              <Box sx={{ marginTop: 3 }}>
                <Typography component="h2">
                  Rate: 1 {baseCur} = {rateData.exchange_rate} {quoteCur}
                </Typography>
                <Typography component="h2">
                  Amount: {rateData.amount}
                </Typography>
              </Box>
            )
          )}
        </>
      )}
    </Grid>
  );
}
