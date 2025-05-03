import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Available");

  const resetForm = () => {
    setProductName("");
    setQuantity("");
    setCategory("");
    setStatus("Available");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !quantity || !category) {
      return; // Don't submit if any field is empty
    }

    console.log("Adding Product:", productName, quantity, category, status);

    toast.success("Material added successfully!", {
      position: "top-right",
      autoClose: 3000,
      style: { fontWeight: 600, fontSize: '17px' },
    });

    resetForm();
    onClose();
  };

  const handleCancel = () => {
    toast.info("Add material canceled.", {
      position: "top-right",
      autoClose: 2500,
      style: { fontWeight: 600, fontSize: '17px' },
    });

    resetForm();
    onClose();
  };

  const handleBackdropClick = () => {
    // Just close the modal and reset form — no toast
    resetForm();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-semibold mb-4">Add New Material</h2>
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
