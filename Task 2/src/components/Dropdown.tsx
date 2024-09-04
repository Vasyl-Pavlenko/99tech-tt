import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { DropdownProps, DropdownOption } from '../types/types';

export const Dropdown = ({ label, value, onChange, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    setIsOpen(false);
    onChange(option.value as string);
  };

  return (
    <div className="relative w-40">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="flex items-center">
          <img
            className="h-6 mr-2"
            src={options.find((option) => option.value === value)?.icon}
            alt={`${value} Icon`}
          />
          {value}
        </span>

        {isOpen ? (
          <MdKeyboardArrowUp className="h-6 w-6 text-blue-500" />
        ) : (
          <MdKeyboardArrowDown className="h-6 w-6 text-blue-500" />
        )}
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 w-full max-h-40 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}>
              <span className="flex items-center">
                <img className="h-6 mr-2" src={option.icon} alt={`${option.label} Icon`} />
                {option.label}
              </span>

              {value === option.value && <AiOutlineCheck className="h-5 w-5 text-indigo-600" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
