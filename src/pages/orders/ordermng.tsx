import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/breadcrums";
import Loading from "../../components/loading";
import OrderListAndCheckout from "../../components/ordercheckout.tsx";
import { useInventory } from "../../hooks/useInventory"; // Import the hook
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

type Order = {
  inventoryId: number; // Added inventoryId to match backend and OrderListAndCheckout
  name: string;        // Product name
  brand?: string;      // Brand (optional)
  description: string;
  unitPrice: number;
  quantity: number;
};

const Orders: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [amountGiven, setAmountGiven] = useState<number>(0);
  const { inventory, loading, refreshInventory } = useInventory(); // Use the hook with refresh functionality

  useEffect(() => {
    if (loading || !gridRef.current) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest(".add-to-order") as HTMLElement;

      // Check if the button exists and is not disabled
      if (!button || button.hasAttribute("disabled")) {
        return; // Ignore clicks on disabled buttons
      }

      event.preventDefault();
      event.stopPropagation();

      const inventoryId = parseInt(button.getAttribute("data-id") || "0", 10);
      const productName = button.getAttribute("data-name") || "";
      const productBrand = button.getAttribute("data-brand") || "";
      const productDescription = button.getAttribute("data-description") || "";
      const productPrice = parseFloat(button.getAttribute("data-price") || "0");

      setOrders((prevOrders) => {
        const index = prevOrders.findIndex(
          (order) =>
            order.inventoryId === inventoryId && // Match by inventoryId
            order.name === productName &&
            order.brand === productBrand &&
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
            inventoryId,
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
            const inventoryId = row.cells[0].data; // Assuming inventoryId is in the first column
            const productName = row.cells[1].data;
            const productBrand = row.cells[2].data;
            const productDescription = row.cells[3].data;
            const productPrice = row.cells[5].data;
            const productQuantity = row.cells[6].data;
            const productUnit = row.cells[4].data; // Unit is in the 5th column

            // Enable the button if the unit is "Cubic" or "Kilogram" OR if the quantity is greater than 0
            const isDisabled = !(productUnit === "Cubic" || productUnit === "Kilogram") && Number(productQuantity) === 0;

            return html(`
              <button
                class="add-to-order bg-blue-500 text-white px-2 py-3 rounded-md text-base flex items-center ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}"
                data-id="${inventoryId}"
                data-name="${productName}"
                data-brand="${productBrand}"
                data-description="${productDescription}"
                data-price="${productPrice}"
                ${isDisabled ? "disabled" : ""}
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
        item.id || index + 1, // Assuming `id` is the inventoryId
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

  // Callback to handle order completion
  const handleOrderComplete = () => {
    setOrders([]); // Clear the orders
    refreshInventory(); // Refresh the inventory
  };

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
                onOrderComplete={handleOrderComplete} // Pass the callback
                refreshInventory={refreshInventory} // Pass refreshInventory here
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;