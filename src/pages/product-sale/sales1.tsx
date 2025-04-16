import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import ItemButtons from "../../components/buttons.tsx";
import TransactionButtons from "../../components/transactionbtn.tsx";
import QuantityButton from "../../components/quantitybutton.tsx";

const Sales1: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orders, setOrders] = useState<{ name: string; price: number }[]>([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "55px" },
          {
            name: "Category",
            width: "100px",
            formatter: (_, row) =>
              html(
                `<div class="flex items-center gap-3">
                  <span>${row.cells[1].data}</span>
                </div>`
              ),
          },
          { name: "Brand", width: "125px" },
          { name: "Description", width: "125px" },
          { name: "Unit", width: "100px" },
          { name: "Price", width: "100px" },
          { name: "Quantity", width: "100px" },
          {
            name: "Action",
            width: "150px",
            formatter: (_, row) => {
              const productName = row.cells[2].data;
              const productPrice = row.cells[5].data;

              return html(`
                <button
                  class="add-to-order bg-blue-500 text-white px-2 py-3 rounded-md text-s flex items-center"
                  data-name="${productName}"
                  data-price="${productPrice}"
                >
                  <i class="ri-add-line mr-1"></i>
                  <span class="px-1">Add to Order</span>
                </button>
              `);
            },
          },
        ],
        pagination: { limit: 7 },
        search: true,
        sort: true,
        data: [
          ["Plywood", "Marine", "¼ inch", "pc", 450, 0],
          ["Plywood", "Marine", "½ inch", "pc", 780, 0],
          ["Plywood", "Ordinary", "½ inch", "pc", 580, 0],
          ["Plywood", "China", "¾ inch", "pc", 980, 0],
          ["Plywood", "Top Forest", "¾ inch", "pc", 1250, 0],
        ].map((row, index) => [(index + 1) + ".", ...row]),
      });

      grid.render(gridRef.current);

      // Use event delegation after render
      const container = gridRef.current;
      const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;

        // Find the closest button with .add-to-order class
        const button = target.closest(".add-to-order") as HTMLElement;
        if (!button) return;

        const productName = button.getAttribute("data-name") || "";
        const productPrice = parseFloat(button.getAttribute("data-price") || "0");

        setOrders((prevOrders) => {
          if (!prevOrders.some((order) => order.name === productName)) {
            return [...prevOrders, { name: productName, price: productPrice }];
          }
          return prevOrders;
        });
      };

      container.addEventListener("click", handleClick);

      // Cleanup event listener on component unmount
      return () => {
        container.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const subtotal = orders.reduce((sum, order) => sum + order.price, 0);
  const totalAmount = subtotal + (isNaN(deliveryFee) ? 0 : deliveryFee);
  const change = Math.max(amountGiven - totalAmount, 0);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
        <Breadcrumb title="Manage Orders" links={[ { text: "Dashboard", link: "/" }, { text: "Sales Orders", link: "/products" } ]} active="Wood" />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-8 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <ItemButtons />
                  <hr className="mt-3 mb-4" />
                  <div ref={gridRef}></div>
                </div>
              </div>
            </div>

            {/* Order List */}
            <div className="xxl:col-span-4 col-span-12">
              <div className="box overflow-hidden main-content-card flex flex-col justify-between" style={{ height: "815px" }}>
                <div className="box-body p-5">
                  <h5 className="mt-2 mb-0">
                    <span><b>Orders</b></span>
                  </h5>
                  <hr className="mt-3 mb-0" />
                  <div className="flex flex-col gap-3 overflow-y-auto pr-2" style={{ maxHeight: "400px" }}>
                    {orders.map((order, index) => (
                      <div
                        key={index}
                        className="flex justify-between bg-white shadow-md border border-gray-200 p-3 rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-gray-900">{order.name}</p>
                          <QuantityButton />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700 transition-all duration-200"
                            onClick={() => setOrders(orders.filter((_, i) => i !== index))}
                          >
                            ✖
                          </button>
                          <p className="text-lg font-semibold text-gray-900">
                            ₱{order.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout Section */}
                <div className="p-5 border-t bg-gray-50 flex flex-col items-stretch gap-3">
                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Subtotal:</span>
                    <input type="text" value={`₱${subtotal.toFixed(2)}`} disabled className="px-2 py-1 border rounded-md w-32" />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Delivery Charges:</span>
                    <input
                      type="number"
                      value={isNaN(deliveryFee) ? "" : deliveryFee}
                      onChange={(e) => setDeliveryFee(e.target.value === "" ? NaN : parseFloat(e.target.value) || 0)}
                      className="px-2 py-1 border rounded-md w-32"
                    />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <span className="font-medium text-sm text-gray-600">Total Amount:</span>
                    <input type="text" value={`₱${totalAmount.toFixed(2)}`} disabled className="px-2 py-1 border rounded-md w-32" />
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-600">Enter Amount:</span>
                      <input
                        type="number"
                        value={isNaN(amountGiven) ? "" : amountGiven}
                        onChange={(e) => setAmountGiven(e.target.value === "" ? NaN : parseFloat(e.target.value) || 0)}
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

                  <TransactionButtons onProcess={() => { setOrders([]); setAmountGiven(0); setDeliveryFee(0); }}
                      onCancel={() => { setOrders([]); setAmountGiven(0); setDeliveryFee(0);
                      }} hasOrder={orders.length > 0}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales1;
