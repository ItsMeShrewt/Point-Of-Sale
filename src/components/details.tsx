import React, { useState } from "react";
import Swal from "sweetalert2";

interface DetailsProps {
  onClose: () => void;
  onProcess: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose, onProcess }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [type, setType] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    type !== "" &&
    (type === "Delivery" ? address.trim() !== "" && fee.trim() !== "" : true);

  const handleProceed = () => {
    if (!isFormValid) return;

    Swal.fire({
      icon: "success",
      title: "Transaction Processed",
      html: `
        <strong>Name:</strong> ${name}<br/>
        ${type === "Delivery" ? `<strong>Address:</strong> ${address}<br/><strong>Delivery Fee:</strong> ₱${fee}<br/>` : ""}
        <strong>Type:</strong> ${type}
      `,
    });

    onProcess();
    onClose();

    // Reset form
    setName("");
    setAddress("");
    setFee("");
    setType("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-sm shadow-md w-80 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Transaction Details</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={name.trim() === ""} // 🔒 Disable until name is entered
        >
          <option value="">-- Select Type --</option>
          <option value="Pick-up">Pick-up</option>
          <option value="Delivery">Delivery</option>
        </select>

        {type === "Delivery" && (
          <>
            <input
              type="text"
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Delivery Fee"
              className="w-full border p-2 rounded"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              min="0"
            />
          </>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-sm text-white transition ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            onClick={handleProceed}
            disabled={!isFormValid}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
