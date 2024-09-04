import React from 'react';
import {SwapForm} from './components'; // Make sure to import your CurrencyConverter component

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-200">
      <SwapForm />

      <div className="mt-4 text-sm text-black">
        By{' '}
        <a
          href="https://github.com/Vasyl-Pavlenko"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          Vasyl Pavlenko
        </a>
      </div>
    </div>
  );
};

export default App;
