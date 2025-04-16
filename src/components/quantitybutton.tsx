import React, { useState } from "react";

interface QuantityButtonProps {
  initialQuantity?: number;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 bg-red-700 text-white rounded-lg"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="px-4 py-1 border rounded-md">{quantity}</span>
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-lg"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
