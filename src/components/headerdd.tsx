import React, { useState } from "react";
import pfp from "../assets/images/faces/14.jpg";

interface ProfileDropdownProps {
  show: boolean;
  toggle: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ show, toggle }) => {
  const [inventoryOpen, setInventoryOpen] = useState(false);

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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          {/* Main Menu */}
          {!inventoryOpen && (
            <div className="p-2">
              <a
                href="/orders"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <i className="bi bi-cart-check-fill text-lg"></i>
                <span>Order</span>
              </a>
              <hr className="my-1" />

              <button
                onClick={() => setInventoryOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-box-fill text-lg"></i>
                  Inventory
                </span>
                <i className="bi bi-caret-right-fill"></i>
              </button>

              <hr className="my-1" />
              <a
                href="/history"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <i className="bi bi-file-earmark-text-fill text-lg"></i>
                <span>History</span>
              </a>
              <hr className="my-1" />
              <a
                href="/logout"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <i className="bi bi-box-arrow-right text-lg"></i>
                <span>Logout</span>
              </a>
            </div>
          )}

          {/* Inventory Submenu */}
          {inventoryOpen && (
            <div className="p-2">
              <button
                onClick={() => setInventoryOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <i className="bi bi-caret-left-fill text-lg"></i>
                <span>Back</span>
              </button>
              <hr className="my-1" />
              <a
                href="/inventory"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-building-fill text-lg"></i>
                  Warehouse A
                </span>
              </a>
              <hr className="my-1" />
              <a
                href="/inventory/list2"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-building-fill text-lg"></i>
                  Warehouse B
                </span>
              </a>
              <hr className="my-1" />
              <a
                href="/inventory/list3"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-building-fill text-lg"></i>
                  Warehouse C
                </span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
