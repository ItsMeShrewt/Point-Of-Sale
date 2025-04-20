import React from "react";

interface CategoryButtonsProps {
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-0 mt-0">
      <button
        className={`px-4 py-2 rounded-md ${
          selectedCategory === "Warehouse A" ? "bg-blue-700" : "bg-blue-500"
        } text-white`}
        onClick={() => handleCategoryChange("Warehouse A")}
      >
        Warehouse A
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedCategory === "Warehouse B" ? "bg-blue-700" : "bg-blue-500"
        } text-white`}
        onClick={() => handleCategoryChange("Warehouse B")}
      >
        Warehouse B
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedCategory === "Warehouse C" ? "bg-blue-700" : "bg-blue-500"
        } text-white`}
        onClick={() => handleCategoryChange("Warehouse C")}
      >
        Warehouse C
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedCategory === "" ? "bg-gray-700" : "bg-gray-500"
        } text-white`}
        onClick={() => handleCategoryChange("")}
      >
        All
      </button>
    </div>
  );
};

export default CategoryButtons;
