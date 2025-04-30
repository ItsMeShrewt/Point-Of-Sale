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
      title: '<span style="font-size: 25px; font-weight: bold;">Transaction Processed</span>',
      html: `
        <div style="display: flex; justify-content: center;">
          <table style="font-size: 15px; text-align: left;">
            <tr>
              <td style="padding: 4px 8px; font-weight: bold;">Name:</td>
              <td style="padding: 4px 8px;">${name}</td>
            </tr>
            ${
              type === "Delivery"
                ? `
                  <tr>
                    <td style="padding: 4px 8px; font-weight: bold;">Address:</td>
                    <td style="padding: 4px 8px;">${address}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 8px; font-weight: bold;">Delivery Fee:</td>
                    <td style="padding: 4px 8px;">₱${fee}</td>
                  </tr>
                `
                : ""
            }
            <tr>
              <td style="padding: 4px 8px; font-weight: bold;">Type:</td>
              <td style="padding: 4px 8px;">${type}</td>
            </tr>
          </table>
        </div>
      `,
      customClass: {
        title: 'text-xl font-bold', // Tailwind utility classes if using Tailwind
        popup: 'text-left',
      }
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
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-5">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded text-base font-medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded text-base font-medium"
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
              className="w-full border p-3 rounded text-base font-medium"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Delivery Fee"
              className="w-full border p-3 rounded text-base font-medium"
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
