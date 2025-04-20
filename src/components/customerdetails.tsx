import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  orderDetails: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, orderDetails }) => {
  if (!isOpen || !orderDetails) return null;

  const address = orderDetails[6] || 'Gusa, Cagayan de Oro City';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 ml-10 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h3 className="text-2xl font-bold text-center mt-4 mb-6">Order Details</h3>

        <div className="space-y-4 px-4">
          <p className="text-base">
            <strong>Name: &nbsp;</strong>
            <span className="text-base">{orderDetails[0]}</span>
          </p>
          <p className="text-base">
            <strong>Date: &nbsp;</strong>
            <span className="text-base">{orderDetails[1]}</span>
          </p>
          <p className="text-base">
            <strong>Product: &nbsp;</strong>
            <span className="text-base">{orderDetails[2]}</span>
          </p>
          <p className="text-base">
            <strong>Total: &nbsp;</strong>
            <span className="text-base">{orderDetails[3]}</span>
          </p>
          <p className="text-base">
            <strong>Payment: &nbsp;</strong>
            <span className="text-base">{orderDetails[4]}</span>
          </p>
          <p className="text-base">
            <strong>Status: &nbsp;</strong>
            <span className="text-base">{orderDetails[5]}</span>
          </p>
          <p className="text-base">
            <strong>Address: &nbsp;</strong>
            <span className="text-base">{address}</span>
          </p>
        </div>

        <div className="mt-4 mb-4 flex justify-center space-x-2">
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 text-lg"
          >
            Done
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 text-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
