import React, { useState } from "react";
import Swal from "sweetalert2";

interface DetailsProps {
  onClose: () => void;
  onProcess: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose, onProcess }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState(""); // Start with empty string

  const isFormValid = name.trim() !== "" && address.trim() !== "" && type !== "";

  const handleProceed = () => {
    onClose();

    Swal.fire({
      icon: "success",
      title: "Transaction Processed",
      html: `
        <strong>Name:</strong> ${name}<br/>
        <strong>Address:</strong> ${address}<br/>
        <strong>Type:</strong> ${type}
      `,
    });

    onProcess();

    // Optional: Reset fields (if needed)
    setName("");
    setAddress("");
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

        <input
          type="text"
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- Select Type --</option>
          <option value="Pick-up">Pick-up</option>
          <option value="Delivery">Delivery</option>
        </select>

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
