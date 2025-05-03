import React, { useState } from "react";
import { toast } from "react-toastify";
import Details from "./details";

interface TransactionButtonsProps {
  onProcess: () => void;
  onCancel: () => void;
  hasOrder: boolean;
  canProcess: boolean;
}

const TransactionButtons: React.FC<TransactionButtonsProps> = ({
  onProcess,
  onCancel,
  hasOrder,
  canProcess,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const disabledStyle = "opacity-50 cursor-not-allowed";

  const handleConfirmCancel = () => {
    onCancel();
    toast.info("Transaction was cancelled.", {
      position: "top-right",
      autoClose: 2000,
      style: { fontWeight: 600, fontSize: '17px' },
    });
    setShowCancelConfirm(false);
  };

  return (
    <>
      <div className="p-5 border-t bg-gray-50 flex justify-center space-x-4">
        {/* Process Button */}
        <button
          className={`flex-1 px-3 py-2 ${
            canProcess ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          } text-white rounded-md transition text-lg ${
            !canProcess ? disabledStyle : ""
          }`}
          onClick={() => setShowModal(true)}
          disabled={!canProcess}
        >
          Process
        </button>

        {/* Cancel Button */}
        <button
          className={`flex-1 px-3 py-2 ${
            hasOrder ? "bg-red-500 hover:bg-red-600" : "bg-gray-400"
          } text-white rounded-md transition text-lg ${
            !hasOrder ? disabledStyle : ""
          }`}
          onClick={() => setShowCancelConfirm(true)}
          disabled={!hasOrder}
        >
          Cancel
        </button>
      </div>

      {/* Show Details Modal */}
      {showModal && (
        <Details onClose={() => setShowModal(false)} onProcess={onProcess} />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md text-center w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel this transaction?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmCancel}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowCancelConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionButtons;
