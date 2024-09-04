import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiExchangeDollarLine } from 'react-icons/ri';
import { Dropdown, ErrorMessage, Input, Modal } from './index';
import { useCurrencies } from "../hooks/useCurrencies";

export const SwapForm = () => {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');
  const [dropdownError, setDropdownError] = useState<string>('');

  const { currencies, dropdownOptions, currencieLoading } = useCurrencies();

  if (currencieLoading) {
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
    </div>;
  }

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputError('');
      setAmount(event.target.value);
    };

  const handleCurrencyChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (currency: string) => {
      setDropdownError('');
      setter(currency);
    };

  useEffect(() => {
    const fromRate = currencies.find((c) => c.currency === fromCurrency)?.price ?? 1;
    const toRate = currencies.find((c) => c.currency === toCurrency)?.price ?? 1;

    if (amount) {
      const amountValue = parseFloat(amount);

      if (!isNaN(amountValue) && amountValue > 0) {
        setConvertedAmount((amountValue * fromRate) / toRate);
      } else {
        setInputError('Please enter an amount greater than zero.');
      }
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromCurrency, toCurrency, currencies]);

  const closeModal = () => setShowModal(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (parseFloat(amount) <= 0 || amount === '') {
      setInputError('Please enter an amount greater than zero.');
      return;
    }

    if (fromCurrency === toCurrency) {
      setDropdownError('Please pick different currencies for the exchange');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="flex flex-col gap-2">
          <Input
            label="Enter Amount for Conversion:"
            value={amount}
            onAmountChange={handleAmountChange}
          />
        </section>

        {inputError && <ErrorMessage message={inputError} />}

        <section className="flex items-center justify-center relative gap-8">
          <Dropdown
            label="From:"
            value={fromCurrency}
            options={dropdownOptions}
            onChange={handleCurrencyChange(setFromCurrency)}
          />

          <button type="submit" className="flex items-center justify-center mt-6">
            <RiExchangeDollarLine className="text-2xl text-blue-500" />
          </button>

          <Dropdown
            label="To:"
            value={toCurrency}
            options={dropdownOptions}
            onChange={handleCurrencyChange(setToCurrency)}
          />
        </section>

        {dropdownError && <ErrorMessage message={dropdownError} />}

        {amount && !inputError && !dropdownError && (
          <section className="text-black mt-2">
            <span>
              You will receive:{' '}
              <strong>{convertedAmount ? convertedAmount.toFixed(2) : '...'}</strong> {toCurrency}
            </span>
          </section>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-bold rounded-md ${
            loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}>
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span>Converting...</span>
              <AiOutlineLoading3Quarters className="animate-spin text-2xl text-blue-500" />
            </div>
          ) : (
            'Convert'
          )}
        </button>
      </form>

      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
};
