import React from 'react';
import { ModalProps } from '../types/types';


export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-5 rounded-md text-center">
        <h2 className="text-xl font-bold mb-2">
          Success!
        </h2>

        <p className="mb-4">
          Conversion completed successfully.
        </p>
        
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
