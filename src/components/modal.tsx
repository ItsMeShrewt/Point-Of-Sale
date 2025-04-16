// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-4 w-1/2 max-w-xl relative overflow-auto max-h-[90vh] mx-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-semibold"
      >
        ✖
      </button>
        {/* Add padding top to avoid overlap with close button */}
        <div className="overflow-x-auto pt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
