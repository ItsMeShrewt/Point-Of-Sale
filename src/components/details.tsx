import React, { useState } from "react";
import { toast } from "react-toastify";

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

    // ✅ Toastify notification with semibold heading
    toast.success(
      <div>
        <div className="text-base font-semibold mb-1">
          Transaction processed successfully!
        </div>
        <div className="text-base font-normal" style={{ paddingLeft: '1rem' }}>
        <p>Name: {name}</p>
        <p>Type: {type}</p>
        {type === "Delivery" && (
          <>
            <p>Address: {address}</p>
            <p>Delivery Fee: ₱{fee}</p>
          </>
        )}
      </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3500,
        style: { fontWeight: 600, fontSize: '17px', width: "375px", whiteSpace: "normal" },
      }
    );    

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
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-5">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded text-lg font-medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded text-lg font-medium"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={name.trim() === ""}
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
              className="w-full border p-3 rounded font-medium"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Delivery Fee"
              className="w-full border p-3 rounded text-lg font-medium"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              min="0"
            />
          </>
        )}

        <div className="flex justify-end gap-3 pt-3">
          <button
            className="px-4 py-2 bg-gray-300 font-semibold rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white font-semibold transition ${
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
