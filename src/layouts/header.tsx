import { useState } from "react"; // Import `useState` from React
import ProfileDropdown from "../components/headerdd.tsx"; // Import the ProfileDropdown component

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    "New order placed",
    "Stock alert: Cement low",
    "Customer left a message",
  ];

  return (
    <header className="app-header sticky" id="header">
      <div className="main-header-container container-fluid">
        <div className="header-content-left">
          {/* Add any content that was previously there */}
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

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[250px] bg-white rounded-md shadow-lg z-40">
                <div className="p-3 border-b font-semibold text-gray-700">
                  Notifications
                </div>
                <ul className="max-h-60 overflow-auto space-y-2 p-2">
                  {notifications.map((note, index) => {
                    let iconColor = "text-blue-600";

                    if (/out\s*of\s*stock/i.test(note)) {
                      iconColor = "text-red-600";
                    } else if (/low/i.test(note) || /stock alert/i.test(note)) {
                      iconColor = "text-yellow-600";
                    }

                    return (
                      <li
                        key={index}
                        className="flex items-start gap-2 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-700"
                      >
                        <i className={`bi bi-exclamation-triangle-fill mt-0.5 ${iconColor}`}></i>
                        <span className="flex-1">{note}</span>
                      </li>
                    );
                  })}
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
  );
}

export default Header;
