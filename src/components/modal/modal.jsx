import React from 'react';

const Modal = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
