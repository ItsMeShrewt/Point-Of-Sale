import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { to: "/product-sales/sales1", label: "Wood" },
  { to: "/product-sales/sales2", label: "Steel" },
  { to: "/product-sales/sales3", label: "Sand & Gravel" },
  { to: "/product-sales/sales4", label: "Paint" },
  { to: "/product-sales/sales5", label: "Sealants & Coating" },
];

const ItemDropdown: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <div className="flex justify-end mb-4">
      <select
        value={location.pathname}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option disabled value="">
          Select Product
        </option>
        {items.map(({ to, label }) => (
          <option key={label} value={to}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemDropdown;
