import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductName?: string;
  initialBrand?: string;
  initialDescription?: string;
  initialUnit?: string;
  initialPrice?: string;
  initialQuantity?: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, initialProductName = "", initialBrand = "", initialDescription = "", initialUnit = "", initialPrice = "", initialQuantity = "" }) => {
  const [productName, setProductName] = useState(initialProductName);
  const [brand, setBrand] = useState(initialBrand);
  const [description, setDescription] = useState(initialDescription);
  const [unit, setUnit] = useState(initialUnit);
  const [price, setPrice] = useState(initialPrice);
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
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl text-center font-semibold mb-2">Edit Material</h2>
        <hr className="mb-6 h-1 bg-black border-0"/>
        <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-base font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium mb-1">Brand</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Description</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-base font-medium mb-1">Unit</label>
                <input
                  type="text"
                  className="w-36 border rounded px-3 py-2"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium mb-1">Price</label>
                <input
                  type="text"
                  className="w-36 border rounded px-3 py-2"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium mb-1">Quantity</label>
                <input
                  type="text"
                  className="w-36 border rounded px-3 py-2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
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
