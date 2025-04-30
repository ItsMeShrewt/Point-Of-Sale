import React from "react";
import pfp from "../assets/images/faces/14.jpg";

interface ProfileDropdownProps {
  show: boolean;
  toggle: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ show, toggle }) => {
  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          src={pfp}
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-bold text-medium flex items-center gap-1">
          Macky Enterprise
          <i className={`bi ${show ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
        </span>
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
          <a
            href="/orders"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            <i className="bi bi-cart-check-fill text-lg"></i>
            <span>Order</span>
          </a>
          <hr className="mt-0 mb-0" />
          <a
            href="/inventory"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            <i className="bi bi-box-fill text-lg"></i>
            <span>Inventory</span>
          </a>
          <hr className="mt-0 mb-0" />
          <a
            href="/history"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            <i className="bi bi-file-earmark-text-fill text-lg"></i>
            <span>History</span>
          </a>
          <hr className="mt-0 mb-0" />
          <a
            href="/logout"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            <i className="bi bi-box-arrow-right text-lg"></i>
            <span>Logout</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
