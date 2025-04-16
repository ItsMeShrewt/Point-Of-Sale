import React, { useState } from "react";
import pfp from "../assets/images/faces/14.jpg";

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
            <div className="header-element">
              <div className="horizontal-logo">
                <a href="index.html" className="header-logo">
                  <img
                    src="/assets/images/brand-logos/desktop-logo.png"
                    alt="logo"
                    className="desktop-logo"
                  />
                </a>
              </div>
            </div>
            <div className="header-element mx-lg-0">
              <a
                aria-label="Hide Sidebar"
                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                data-bs-toggle="sidebar"
                href="javascript:void(0);"
              >
                <span></span>
              </a>
            </div>
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
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={pfp}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-medium flex items-center gap-1">
                  Macky Enterprise
                  <i className={`bi ${showProfileMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
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
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
