import React, { useState } from "react";
import ProfileDropdown from "../components/headerdd.tsx"; // import the component

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    "New order placed",
    "Stock alert: Cement low",
    "Customer left a message",
  ];

  return (
    <>
      <header className="app-header sticky" id="header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            {/* ... (unchanged content) ... */}
          </div>

          <div className="header-content-right flex items-center gap-8 px-6">
            {/* Notification Bell */}
            <div className="relative mt-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative focus:outline-none"
              >
                <i className="bi bi-bell-fill text-xl"></i>
                <span className="absolute -top-1 -right-1 inline-block w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-md shadow-lg z-40">
                  <div className="p-3 border-b font-semibold text-gray-700">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-auto">
                    {notifications.map((note, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown
              show={showProfileMenu}
              toggle={() => setShowProfileMenu(!showProfileMenu)}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
