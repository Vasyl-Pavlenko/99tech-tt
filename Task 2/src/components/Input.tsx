import React from 'react';
import { InputProps } from '../types/types';

export const Input: React.FC<InputProps> = ({ label, value, onAmountChange }) => {
  return (
    <div className="mb-4">
      <span className="text-md font-bold text-blue-500">{label}</span>

      <input
        type="number"
        placeholder="100"
        value={value}
        onChange={onAmountChange}
        className="text-base font-normal h-10 w-full bg-white text-black mt-1 p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

