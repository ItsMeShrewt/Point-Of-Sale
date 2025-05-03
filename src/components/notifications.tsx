// src/components/Notifications.tsx

import React from "react";

interface NotificationsProps {
  notifications: string[];
  showNotifications: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, showNotifications }) => {
  if (!showNotifications) return null;

  return (
    <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-md shadow-lg z-40">
      <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
      <ul className="max-h-60 overflow-auto">
        {notifications.map((note, index) => (
          <li key={index} className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
