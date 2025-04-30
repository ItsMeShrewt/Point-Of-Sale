import React, { useState } from "react";
import { showCancelAlert } from "../utils/transalert.tsx";
import Details from "./details.tsx";

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
  const disabledStyle = "opacity-50 cursor-not-allowed";

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
          onClick={() => showCancelAlert(onCancel)}
          disabled={!hasOrder}
        >
          Cancel
        </button>
      </div>

      {/* Show Details Modal */}
      {showModal && (
        <Details onClose={() => setShowModal(false)} onProcess={onProcess} />
      )}
    </>
  );
};

export default TransactionButtons;
