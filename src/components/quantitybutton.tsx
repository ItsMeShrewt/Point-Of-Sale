import React from "react";

interface QuantityButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 bg-red-700 text-white rounded-lg"
        onClick={onDecrement}
      >
        -
      </button>
      <span className="px-4 py-1 border rounded-md">{quantity}</span>
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-lg"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
