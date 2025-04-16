import React from "react";
import { Link, useLocation } from "react-router-dom";

import LumberImg from "../assets/lumber.png";
import SteelImg from "../assets/steel.png";
import SandgravelImg from "../assets/SandGravel.png";
import PaintImg from "../assets/paint.png";
import SealCoatImg from "../assets/SealCoat.png";

const items = [
  { to: "/product-sales/sales1", img: LumberImg, label: "Wood" },
  { to: "/product-sales/sales2", img: SteelImg, label: "Steel" },
  { to: "/product-sales/sales3", img: SandgravelImg, label: "Sand & Gravel" },
  { to: "/product-sales/sales4", img: PaintImg, label: "Paint" },
  { to: "/product-sales/sales5", img: SealCoatImg, label: "Sealants & Coating" },
];

const ItemButtons: React.FC = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {items.map(({ to, img, label }) => (
        <Link
          key={label}
          to={to}
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
            location.pathname === to ? "bg-blue-600 text-white" : "bg-red-800 text-white hover:bg-blue-700"
          }`}
        >
          <img src={img} alt={label} className="w-12 h-12 rounded-lg" />
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ItemButtons;
