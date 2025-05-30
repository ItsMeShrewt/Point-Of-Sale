import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Details from "./transactionform.tsx";

type Order = {
  inventoryId: number;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
};

type Props = {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  amountGiven: number;
  setAmountGiven: React.Dispatch<React.SetStateAction<number>>;
  onOrderComplete: () => void;
  refreshInventory: () => void;
};

interface QuantityButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => (
  <div className="flex items-center gap-2">
    <button
      className="px-2 py-1 bg-red-700 text-white rounded-lg"
      onClick={onDecrement}
    >
      -
    </button>
    <span className="px-4 py-1 border rounded-md">{quantity}</span>
    <button
      className="px-2 py-1 bg-blue-500 text-white rounded-lg"
      onClick={onIncrement}
    >
      +
    </button>
  </div>
);

const OrderListAndCheckout: React.FC<Props> = ({
  orders,
  setOrders,
  amountGiven,
  setAmountGiven,
  onOrderComplete,
  refreshInventory,
}) => {
  const [discount, setDiscount] = useState<number>(0);

  const subtotal = orders.reduce(
    (sum, order) => sum + order.unitPrice * order.quantity,
    0
  );
  const [transactionDetails, setTransactionDetails] = useState<{
    method?: string;
    paymentType?: string;
    deliveryFee?: number;
  }>({});

  // These will be set by the Details modal
  const totalAmount =
    subtotal +
    (transactionDetails.deliveryFee ? transactionDetails.deliveryFee : 0) -
    discount;
  const change = Math.max(amountGiven - totalAmount, 0);
  const canProcess = amountGiven >= totalAmount && totalAmount > 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountGiven(value === "" ? 0 : parseFloat(value));
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiscount(value === "" ? 0 : parseFloat(value));
  };

  // This function will be called from Details modal
  const handleProcessOrder = async (
    name: string,
    address?: string,
    phone?: string,
    method?: string,
    paymentType?: string,
    deliveryFee?: number
  ) => {
    setTransactionDetails({ method, paymentType, deliveryFee });

    if (!method) {
      toast.error(
        "Please select a method (Pick-up or Delivery) before processing the order.",
        {
          position: "top-right",
          className: "text-base font-semibold",
        }
      );
      return;
    }

    // Calculate subtotal before discount and delivery
    const subtotal = orders.reduce(
      (sum, order) => sum + order.unitPrice * order.quantity,
      0
    );

    // If subtotal is 3000 or more, delivery is free
    const finalDeliveryFee = subtotal >= 3000 ? 0 : (deliveryFee || 0);

    try {
      for (const order of orders) {
        const response = await axios.post(
          "http://127.0.0.1/database/index.php/Order/create",
          {
            inventory_id: order.inventoryId,
            quantity: order.quantity,
            delivery_fee: finalDeliveryFee,
            discount: discount,
            payment_type: paymentType,
            method: method,
            customer_name: name,
            customer_address: address || "",
            customer_phone: phone || "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data;

        if (!result.status) {
          toast.error(`Failed to process order for ${order.name}: ${result.message}`);
          return;
        }
      }

      toast.success("Orders processed successfully!", {
        position: "top-right",
        className: "text-base font-semibold",
      });
      setOrders([]);
      setAmountGiven(0);
      setDiscount(0);
      setTransactionDetails({});
      onOrderComplete();
      refreshInventory();
    } catch (error) {
      console.error("Error processing orders:", error);
      toast.error("Failed to process orders. Please try again.");
    }
  };

  const handleCancelOrder = () => {
    setOrders([]);
    setAmountGiven(0);
    setDiscount(0);
    setTransactionDetails({});
    toast.info("Transaction was cancelled.", {
      position: "top-right",
      autoClose: 2000,
      style: { fontWeight: 600, fontSize: "17px" },
    });
  };

  interface TransactionButtonsProps {
    onCancel: () => void;
    hasOrder: boolean;
    canProcess: boolean;
  }

  const TransactionButtons: React.FC<TransactionButtonsProps> = ({
    onCancel,
    hasOrder,
    canProcess,
  }) => {
    const [showModal, setShowModal] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const disabledStyle = "opacity-50 cursor-not-allowed";

    return (
      <>
        <div className="p-5 border-t bg-gray-50 flex justify-center space-x-4">
          <button
            className={`flex-1 px-3 py-2 ${
              canProcess ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            } text-white rounded-md transition text-lg ${
              !canProcess ? disabledStyle : ""
            }`}
            onClick={() => setShowModal(true)}
            disabled={!canProcess}
          >
            Process
          </button>

          <button
            className={`flex-1 px-3 py-2 ${
              hasOrder ? "bg-red-500 hover:bg-red-600" : "bg-gray-400"
            } text-white rounded-md transition text-lg ${
              !hasOrder ? disabledStyle : ""
            }`}
            onClick={() => setShowCancelConfirm(true)}
            disabled={!hasOrder}
          >
            Cancel
          </button>
        </div>

        {showModal && (
          <Details
            onClose={() => setShowModal(false)}
            onProcess={handleProcessOrder}
            subtotal={subtotal}
          />
        )}

        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md text-center w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to cancel this transaction?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={onCancel}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="xxl:col-span-4 col-span-12">
      <div
        className="box overflow-hidden main-content-card flex flex-col justify-between"
        style={{ height: "900px" }}
      >
        <div className="box-body p-5">
          <h5 className="mt-0 mb-0">
            <span className="font-semibold text-3xl text-blue-600">ORDERS</span>
          </h5>
          <hr className="mt-2 mb-2" />
          <div
            className="flex flex-col gap-3 overflow-y-auto pr-2"
            style={{ maxHeight: "450px" }}
          >
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex justify-between bg-white shadow-md border border-gray-800 p-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col">
                  <p className="text-xl font-medium text-gray-900">{order.name}</p>
                  <p className="text-base font-semibold text-gray-600">
                    {order.description}
                  </p>
                  <QuantityButton
                    quantity={order.quantity}
                    onIncrement={() =>
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.name === order.name &&
                          o.description === order.description
                            ? { ...o, quantity: o.quantity + 1 }
                            : o
                        )
                      )
                    }
                    onDecrement={() =>
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.name === order.name &&
                          o.description === order.description && o.quantity > 0
                            ? { ...o, quantity: o.quantity - 1 }
                            : o
                        )
                      )
                    }
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                    onClick={() =>
                      setOrders((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    ✖
                  </button>
                  <p className="text-lg font-semibold text-gray-900">
                    ₱{(order.unitPrice * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t bg-gray-50 flex flex-col items-stretch gap-3">
          {/* Subtotal */}
          <div className="flex justify-between w-full items-center">
            <span className="font-medium text-base text-black">Subtotal:</span>
            <input
              type="text"
              value={`₱${subtotal.toFixed(2)}`}
              disabled
              className="px-2 py-1 border rounded-md w-32"
            />
          </div>

          {/* Discount */}
          <div className="flex justify-between w-full items-center">
            <span className="font-medium text-base text-black">Discount:</span>
            <input
              type="number"
              value={discount === 0 ? "" : discount}
              onChange={handleDiscountChange}
              className="px-2 py-1 border rounded-md w-32"
              disabled={orders.length === 0}
            />
          </div>

          {/* Total Amount */}
          <div className="flex justify-between w-full items-center">
            <span className="font-medium text-base text-black">Total Amount:</span>
            <input
              type="text"
              value={`₱${totalAmount.toFixed(2)}`}
              disabled
              className="px-2 py-1 border rounded-md w-32"
            />
          </div>

          {/* Enter Amount and Change */}
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-base text-black">Enter Amount:</span>
              <input
                type="number"
                value={amountGiven === 0 ? "" : amountGiven}
                onChange={handleAmountChange}
                disabled={orders.length === 0}
                className="px-2 py-1 border rounded-md w-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-base text-black">Change:</span>
              <input
                type="text"
                value={`₱${change.toFixed(2)}`}
                disabled
                className="px-2 py-1 border rounded-md w-32"
              />
            </div>
          </div>

          <TransactionButtons
            onCancel={handleCancelOrder}
            hasOrder={orders.length > 0}
            canProcess={canProcess}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderListAndCheckout;