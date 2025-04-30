import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import ItemButtons from "../../components/buttons.tsx";
import TransactionButtons from "../../components/transactionbtn.tsx";
import QuantityButton from "../../components/quantitybutton.tsx";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orders, setOrders] = useState<
    { name: string; description: string; unitPrice: number; quantity: number }[]
  >([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest(".add-to-order") as HTMLElement;
      if (!button) return;

      event.stopPropagation();

      const productName = button.getAttribute("data-name") || "";
      const productDescription = button.getAttribute("data-description") || "";
      const productPrice = parseFloat(button.getAttribute("data-price") || "0");

      setOrders((prevOrders) => {
        const index = prevOrders.findIndex(
          (order) =>
            order.name === productName &&
            order.description === productDescription
        );

        if (index !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[index] = {
            ...updatedOrders[index],
            quantity: updatedOrders[index].quantity + 1,
          };
          return updatedOrders;
        }

        return [
          ...prevOrders,
          {
            name: productName,
            description: productDescription,
            unitPrice: productPrice,
            quantity: 1,
          },
        ];
      });
    };

    if (!gridRef.current) return;

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
            const productDescription = row.cells[3].data;
            const productPrice = row.cells[5].data;
            const productQuantity = row.cells[6].data;

            const isDisabled = productQuantity === 0;

            return html(
              `<button
                class="add-to-order bg-blue-500 text-white px-2 py-3 rounded-md text-s flex items-center ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}"
                data-name="${productName}"
                data-description="${productDescription}"
                data-price="${productPrice}"
                ${isDisabled ? "disabled" : ""}
              >
                <i class="ri-add-line mr-1"></i>
                <span class="px-1">Add to Order</span>
              </button>`
            );
          },
        },
      ],
      pagination: { limit: 7 },
      search: true,
      sort: true,
      data: [
        ["Plywood", "Marine", "¼ inch", "pc", 450, 5],
        ["Plywood", "Marine", "½ inch", "pc", 780, 0],
        ["Plywood", "Ordinary", "½ inch", "pc", 580, 5],
        ["Plywood", "China", "¾ inch", "pc", 980, 5],
        ["Plywood", "Top Forest", "¾ inch", "pc", 1250, 0],
        ["Rebar", "Nippon Steel", "8 inch", "pc", 100, 6],
        ["Mild Steel Square Hollow Bar", "BM Steel", "1x1", "pc", 400, 4],
        ["Steel Wire", "KEI Industries Ltd", "Per kg", "kg", 90, 0],
        ["Sand", "Holcim", "Per Cubic", "Cubic", 800, 0],
        ["Gravel", "CEMEX", "Per Cubic", "Cubic", 1100, 5],
        ["Sealant", "Bostik", "Vulca Seal", "1L", 750, 20],
        ["Sealant", "Wilcon", "Sure Seal", "50ml", 180, 11],
        ["Adhesive", "Stikwel", "PVA Wood Glue", "250g", 260, 11],
        ["Paint", "Welcoat", "Flatwall Enamel - White", "Gallon", 800, 20],
        ["Paint", "Rain or Shine", "Latex - Pistachio", "Gallon", 650, 20],
        ["Paint", "Boysen", "Flatwall Enamel - White", "Gallon", 860, 19],
        ["Paint", "Dutch Boy", "Roof Paint - Terra Cotta", "Gallon", 650, 16],
        ["Paint", "Popular", "Flatwall Enamel - White", "Gallon", 650, 1],
        ["Paint", "Domino", "Quick Drying Enamel - Aluminum", "Gallon", 650, 3],
        ["Paint", "A-plus", "Acrylic Roof Paint - Baguio Green", "Gallon", 650, 5],
        ["Paint", "Triton", "Metal Primer - Red Oxide", "Gallon", 620, 8],
      ].map((row, index) => [`${index + 1}.`, ...row]),
    });

    grid.render(gridRef.current);
    const container = gridRef.current;
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, []);

  const subtotal = orders.reduce(
    (sum, order) => sum + order.unitPrice * order.quantity,
    0
  );
  const totalAmount = subtotal + (isNaN(deliveryFee) ? 0 : deliveryFee);
  const change = Math.max(amountGiven - totalAmount, 0);
  const canProcess = amountGiven >= totalAmount && totalAmount > 0;

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
              <Link
                to=""
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-add-line"></i> Pending Orders
              </Link>
            }
          />
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
                              setOrders((prevOrders) => {
                                const updated = [...prevOrders];
                                updated[index] = {
                                  ...updated[index],
                                  quantity: updated[index].quantity + 1,
                                };
                                return updated;
                              })
                            }
                            onDecrement={() =>
                              setOrders((prevOrders) => {
                                const updated = [...prevOrders];
                                if (updated[index].quantity > 0) {
                                  updated[index] = {
                                    ...updated[index],
                                    quantity: updated[index].quantity - 1,
                                  };
                                }
                                return updated;
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="text-red-500 hover:text-red-700 transition-all duration-200"
                            onClick={() =>
                              setOrders((prevOrders) =>
                                prevOrders.filter((_, i) => i !== index)
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
