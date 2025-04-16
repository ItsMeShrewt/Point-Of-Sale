import React, { useState, useEffect } from "react";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import TransactionButtons from "../../components/transactionbtn.tsx";
import QuantityButton from "../../components/quantitybutton.tsx";
import Modal from "../../components/modal.tsx";
import ProductTable from "../../components/products.tsx";

const Exp: React.FC = () => {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orders, setOrders] = useState<{ name: string; description: string; price: number; quantity: number }[]>([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subtotal = orders.reduce((sum, order) => sum + order.price, 0);
  const totalAmount = subtotal + (isNaN(deliveryFee) ? 0 : deliveryFee);
  const change = Math.max(amountGiven - totalAmount, 0);

  // 🔥 HOTKEY: Press "T" to open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
  
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setIsModalOpen((prev) => !prev); // 🔁 Toggle
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Orders"
            links={[{ text: " Dashboard", link: "/product-sales" }]}
            active="Sales Orders"
            buttons={
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-add-line"></i> Add Products
              </button>
            }
          />
          <div className="grid grid-cols-12 gap-x-6">
            {/* Order List */}
            <div className="xxl:col-span-12 col-span-12">
              <div
                className="box overflow-hidden main-content-card flex flex-col justify-between"
                style={{ height: "815px" }}
              >
                <div className="box-body p-5">
                  <h5 className="mt-2 mb-0">
                    <span>
                      <b>ORDERS</b>
                    </span>
                  </h5>
                  <hr className="mt-3 mb-2" />
                  <div
                    className="flex flex-col gap-3 overflow-y-auto pr-2"
                    style={{ maxHeight: "400px" }}
                  >
                    {orders.map((order, index) => (
                      <div
                        key={index}
                        className="flex justify-between bg-white shadow-md border border-gray-200 p-3 rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex flex-col">
                          <p className="text-xl font-medium text-gray-900">{order.name}</p>
                          <p className="text-lg text-gray-600">{order.description}</p>
                        </div>
                        <div className="flex flex-col mt-4">
                          <QuantityButton />
                        </div>
                        <div className="flex flex-col mt-4">
                          <p className="text-lg font-semibold text-gray-900">
                            ₱{order.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700 transition-all duration-200 mt-4"
                            onClick={() => setOrders(orders.filter((_, i) => i !== index))}
                          >
                            <i className="text-lg font-medium bi bi-trash p-4 bg-gray-100 rounded-lg"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout Section */}
                <div className="p-5 border-t bg-gray-50 flex flex-col items-stretch gap-3">
                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Subtotal:</span>
                    <input
                      type="text"
                      value={`₱${subtotal.toFixed(2)}`}
                      disabled
                      className="px-2 py-1 border rounded-md w-32"
                    />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Delivery Charges:</span>
                    <input
                      type="number"
                      value={isNaN(deliveryFee) ? "" : deliveryFee}
                      onChange={(e) =>
                        setDeliveryFee(e.target.value === "" ? NaN : parseFloat(e.target.value) || 0)
                      }
                      className="px-2 py-1 border rounded-md w-32"
                    />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Total Amount:</span>
                    <input
                      type="text"
                      value={`₱${totalAmount.toFixed(2)}`}
                      disabled
                      className="px-2 py-1 border rounded-md w-32"
                    />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-600">Enter Amount:</span>
                      <input
                        type="number"
                        value={isNaN(amountGiven) ? "" : amountGiven}
                        onChange={(e) =>
                          setAmountGiven(e.target.value === "" ? NaN : parseFloat(e.target.value) || 0)
                        }
                        className="px-2 py-1 border rounded-md w-32"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-600">Change:</span>
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Product Table */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductTable setOrders={setOrders} />
      </Modal>
    </>
  );
};

export default Exp;
