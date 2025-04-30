import React from "react";
import QuantityButton from "./quantitybutton.tsx";
import TransactionButtons from "./transactionbtn.tsx";

type Order = {
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
  deliveryFee: number;
  setDeliveryFee: React.Dispatch<React.SetStateAction<number>>;
};

const OrderListAndCheckout: React.FC<Props> = ({
  orders,
  setOrders,
  amountGiven,
  setAmountGiven,
  deliveryFee,
  setDeliveryFee,
}) => {
  const subtotal = orders.reduce(
    (sum, order) => sum + order.unitPrice * order.quantity,
    0
  );
  const totalAmount = subtotal + (isNaN(deliveryFee) ? 0 : deliveryFee);
  const change = Math.max(amountGiven - totalAmount, 0);
  const canProcess = amountGiven >= totalAmount && totalAmount > 0;

  return (
    <div className="xxl:col-span-4 col-span-12">
      <div
        className="box overflow-hidden main-content-card flex flex-col justify-between"
        style={{ height: "815px" }}
      >
        <div className="box-body p-5">
          <h5 className="mt-2 mb-0">
            <b>Orders</b>
          </h5>
          <hr className="mt-3 mb-0" />
          <div
            className="flex flex-col gap-3 overflow-y-auto pr-2"
            style={{ maxHeight: "450px" }}
          >
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex justify-between bg-white shadow-md border border-gray-200 p-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col">
                  <p className="text-xl font-medium text-gray-900">
                    {order.name}
                  </p>
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
                          o.description === order.description && o.quantity > 1
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
                      setOrders((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
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
          <div className="flex justify-between w-full items-center">
            <span className="font-medium text-sm text-gray-600">
              Subtotal:
            </span>
            <input
              type="text"
              value={`₱${subtotal.toFixed(2)}`}
              disabled
              className="px-2 py-1 border rounded-md w-32"
            />
          </div>

          <div className="flex justify-between w-full items-center">
            <span className="font-medium text-sm text-gray-600">
              Total Amount:
            </span>
            <input
              type="text"
              value={`₱${totalAmount.toFixed(2)}`}
              disabled
              className="px-2 py-1 border rounded-md w-32"
            />
          </div>

          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-600">
                Enter Amount:
              </span>
              <input
                type="number"
                value={isNaN(amountGiven) ? "" : amountGiven}
                onChange={(e) =>
                  setAmountGiven(
                    e.target.value === ""
                      ? NaN
                      : parseFloat(e.target.value) || 0
                  )
                }
                className="px-2 py-1 border rounded-md w-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-600">
                Change:
              </span>
              <input
                type="text"
                value={`₱${change.toFixed(2)}`}
                disabled
                className="px-2 py-1 border rounded-md w-32"
              />
            </div>
          </div>

          <TransactionButtons
            onProcess={() => {
              setOrders([]);
              setAmountGiven(0);
              setDeliveryFee(0);
            }}
            onCancel={() => {
              setOrders([]);
              setAmountGiven(0);
              setDeliveryFee(0);
            }}
            hasOrder={orders.length > 0}
            canProcess={canProcess}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderListAndCheckout;
