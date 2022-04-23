export enum SupportedCurrencies {
  USD = 'USD',
  EUR = 'EUR',
  ILS = 'ILS',
}

export interface ApiResponse {
  exchange_rate: number;
  currency_code: SupportedCurrencies;
  amount: number;
}

export interface AmountProps {
  value?: number;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
  validate: (val: any) => boolean;
}

export interface CurrencyProps {
  label: string;
  labelId: string;
  value?: SupportedCurrencies;
  onChange: (e: any) => void;
  validate: (val: any) => boolean;
}
