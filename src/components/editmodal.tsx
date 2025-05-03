import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductName?: string;
  initialQuantity?: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, initialProductName = "", initialQuantity = "" }) => {
  const [productName, setProductName] = useState(initialProductName);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ✅ Show success toast
    toast.success("Material updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      style: { fontWeight: 600, fontSize: '17px' },
    });

    console.log("Form submitted", { productName, quantity });

    // Reset inputs after successful save
    setProductName("");
    setQuantity("");

    onClose();
  };

  const handleCancel = () => {
    // 🚫 Show cancel toast only if cancel button is clicked
    toast.info("Edit canceled.", {
      position: "top-right",
      autoClose: 2500,
      style: { fontWeight: 600, fontSize: '17px' },
    });

    // Reset inputs when canceled
    setProductName("");
    setQuantity("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()} // Close the modal when clicking outside
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-xl font-semibold mb-4">Edit Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel} // Show cancel toast only when clicking cancel
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
