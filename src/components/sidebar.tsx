import React from 'react';

interface PendingOrdersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pendingOrders: { id: number; type: 'Pick-up' | 'Delivery'; customer: string; details: string }[];
}

const PendingOrdersSidebar: React.FC<PendingOrdersSidebarProps> = ({ isOpen, onClose, pendingOrders }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Pending Orders</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {pendingOrders.length === 0 ? (
            <p className="text-center text-gray-500">No pending orders.</p>
          ) : (
            pendingOrders.map((order) => (
              <div
                key={order.id}
                className="mb-4 p-4 border rounded shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold">{order.customer}</p>
                <p className="text-sm text-gray-600">{order.details}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    order.type === 'Delivery'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PendingOrdersSidebar;
