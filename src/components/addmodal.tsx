import React, { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Available");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add a new product (you can connect it to your state or API)
    console.log("Adding Product:", productName, quantity, category, status);
    onClose();
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose} // Close modal if clicking outside
        >
          {/* Modal content */}
          <div
            className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal if clicking inside the modal
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
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
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
