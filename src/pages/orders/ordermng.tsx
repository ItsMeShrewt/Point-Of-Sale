import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import ItemButtons from "../../components/buttons.tsx";
import { Link } from "react-router-dom";
import OrderListAndCheckout from "../../components/ordercheckout.tsx";

type Order = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
};

const Orders: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest(".add-to-order") as HTMLElement;
      if (!button) return;
  
      event.preventDefault();
      event.stopPropagation(); // Prevent event propagation
  
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
    if (!container) return;
  
    container.addEventListener("click", handleClick);
  
    return () => {
      container.removeEventListener("click", handleClick);
    };
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

            <OrderListAndCheckout
              orders={orders}
              setOrders={setOrders}
              amountGiven={amountGiven}
              setAmountGiven={setAmountGiven}
              deliveryFee={deliveryFee}
              setDeliveryFee={setDeliveryFee}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
