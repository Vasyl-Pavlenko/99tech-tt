import axios from 'axios';
import { useState, useEffect } from 'react';
import { Currency, DropdownOption } from '../types/types';

const apiUrl = process.env.REACT_APP_PRICES_API_URL as string;
const getTokenIconUrl = (tokenName: string): string =>
  `${process.env.REACT_APP_TOKEN_ICON_URL}${tokenName}.svg`;

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        const uniqueCurrencies = new Set<string>();

        const currencies: Currency[] = response.data.filter((item: Currency) => {
          if (item.price > 0 && !uniqueCurrencies.has(item.currency)) {
            uniqueCurrencies.add(item.currency);
            return true;
          }
          return false;
        });

        const dropdownOptions: DropdownOption[] = currencies.map((item: Currency) => ({
          value: item.currency,
          label: item.currency,
          currency: item.currency,
          icon: getTokenIconUrl(item.currency),
        }));

        setCurrencies(currencies);
        setDropdownOptions(dropdownOptions);
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { currencies, dropdownOptions, currencieLoading: loading };
};
