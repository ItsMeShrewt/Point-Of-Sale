import { useState } from "react";

function PendingOrders() {
  const [orderTab, setOrderTab] = useState("pickup");

  return (
    <div
      className="box overflow-hidden main-content-card shadow border rounded-lg bg-gray-200 min-h-[700px]"
      style={{ height: "505px" }} // Increased height
    >
      <div className="box-body p-6">
        <h5 className="text-lg font-semibold text-gray-800 mb-4">Pending Orders</h5>
        <hr className="mb-4" />

        {/* Pick-up & Delivery Orders (Tabs) */}
        <div
          className="w-full md:w-100 lg:w-300 xl:w-1/2 mx-auto"
          style={{ width: "755px" }}
        >
          {/* Tabs */}
          <div className="flex space-x-4 border-b pb-2">
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                orderTab === "pickup"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-red-500"
              }`}
              onClick={() => setOrderTab("pickup")}
            >
              📦 Pick-up Orders
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                orderTab === "delivery"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-blue-500"
              }`}
              onClick={() => setOrderTab("delivery")}
            >
              🚚 Delivery Orders
            </button>
          </div>

          {/* Scrollable Orders List */}
          <div className="mt-4 overflow-y-auto" style={{ maxHeight: "325px" }}> {/* Increased scrollable area */}
            {orderTab === "pickup" ? (
              <>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #001 - John Doe</p>
                  <p className="text-sm text-gray-600">
                    Status: Ready for Pick-up
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #002 - Jane Smith</p>
                  <p className="text-sm text-gray-600">
                    Status: Ready for Pick-up
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #005 - David Lee</p>
                  <p className="text-sm text-gray-600">
                    Status: Waiting for Pick-up
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #007 - Michael Scott</p>
                  <p className="text-sm text-gray-600">
                    Status: Awaiting Customer
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #009 - Jim Halpert</p>
                  <p className="text-sm text-gray-600">
                    Status: Ready for Pick-up
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Order #010 - Pam Beesly</p>
                  <p className="text-sm text-gray-600">
                    Status: Waiting for Pick-up
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #003 - Alex Johnson</p>
                  <p className="text-sm text-gray-600">
                    Status: Out for Delivery
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #004 - Maria Garcia</p>
                  <p className="text-sm text-gray-600">
                    Status: Preparing for Delivery
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #006 - Sarah Connor</p>
                  <p className="text-sm text-gray-600">
                    Status: Scheduled for Delivery
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #008 - Dwight Schrute</p>
                  <p className="text-sm text-gray-600">
                    Status: Out for Delivery
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm mb-2">
                  <p className="font-semibold">Order #011 - Stanley Hudson</p>
                  <p className="text-sm text-gray-600">
                    Status: Preparing for Delivery
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Order #012 - Kevin Malone</p>
                  <p className="text-sm text-gray-600">
                    Status: Scheduled for Delivery
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
