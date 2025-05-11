import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Available");

  const resetForm = () => {
    setProductName("");
    setBrand("");
    setDescription("");
    setUnit("");
    setPrice("");
    setQuantity("");
    setStatus("Available");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !brand || !description || !unit || !price || !quantity) {
      return; // Don't submit if any field is empty
    }

    console.log("Adding Product:", productName, brand, description, unit, price, quantity, status);

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
            className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-2xl text-center font-semibold mb-2">Add New Material</h2>
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
