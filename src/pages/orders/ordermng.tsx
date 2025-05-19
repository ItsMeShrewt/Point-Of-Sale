// ordermng.tsx
import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import OrderListAndCheckout from "../../components/ordercheckout.tsx";
import Loading from "../../components/loading";
import { useInventory } from "../../hooks/useInventory"; // Import the hook

type Order = {
  name: string;           // product name
  brand?: string;         // brand (optional)
  description: string;
  unitPrice: number;
  quantity: number;
};

const Orders: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);
  const { inventory, loading } = useInventory(); // Use the hook

  useEffect(() => {
    if (loading || !gridRef.current) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest(".add-to-order") as HTMLElement;
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      const productName = button.getAttribute("data-name") || "";
      const productBrand = button.getAttribute("data-brand") || "";
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
            brand: productBrand,
            description: productDescription,
            unitPrice: productPrice,
            quantity: 1,
          },
        ];
      });
    };

    const grid = new Grid({
      columns: [
        { name: "#", width: "50px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        {
          name: "Product Name", width: "150px", formatter: (_, row) =>
            html(`<div class="flex items-center gap-3"><span class="text-base">${row.cells[1].data}</span></div>`)
        },
        { name: "Brand", width: "125px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        { name: "Description", width: "125px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        { name: "Unit", width: "70px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        { name: "Price", width: "70px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        { name: "Quantity", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        {
          name: "Action",
          width: "80px",
          formatter: (_, row) => {
            const productName = row.cells[1].data;       // product name (index 1)
            const productBrand = row.cells[2].data;      // brand (index 2)
            const productDescription = row.cells[3].data;
            const productPrice = row.cells[5].data;
            const productQuantity = row.cells[6].data;
            const isDisabled = productQuantity === 0;

            return html(`
              <button
                class="add-to-order bg-blue-500 text-white px-2 py-3 rounded-md text-base flex items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}"
                data-name="${productName}"
                data-brand="${productBrand}"
                data-description="${productDescription}"
                data-price="${productPrice}"
                ${isDisabled ? 'disabled' : ''}
              >
                <i class="bi bi-cart-fill mr-1"></i>
                <span class="px-1">Add</span>
              </button>
            `);
          },
        },
      ],
      className: {
        th: "text-lg font-semibold",
      },
      pagination: { limit: 9 },
      search: true,
      data: inventory.map((item, index) => [
        `${index + 1}.`,
        item.product_name || "-",
        item.brand || "-",
        item.description || "-",
        item.unit || "-",
        item.price || 0,
        item.quantity || 0,
      ]),
    });

    grid.render(gridRef.current);
    gridRef.current.addEventListener("click", handleClick);

    return () => {
      gridRef.current?.removeEventListener("click", handleClick);
    };
  }, [loading, inventory]);

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
          />

          <Loading loading={loading} />

          {!loading && (
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-8 col-span-12">
                <div className="box overflow-hidden main-content-card">
                  <div className="box-body p-5">
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
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
