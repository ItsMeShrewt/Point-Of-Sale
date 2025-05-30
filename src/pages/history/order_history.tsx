import axios from "axios";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Order_History: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/database/index.php/Order/read");
        const result = response.data;

        if (result.status && Array.isArray(result.data)) {
          const formattedData = result.data.map((order: any, index: number) => [
            `${index + 1}.`, // Row number
            order.id, // Order ID
            order.order_date, // Order Date & Time
            order.product_name, // Product Name
            `₱${parseFloat(order.total_amount).toFixed(2)}`, // Total Amount
            order.payment_type, // Payment Type
            order.method, // Method
            order.status || (order.is_returned === 1 ? "Returned" : "Complete"), // Status
          ]);
          setOrderData(formattedData);
        } else {
          console.error("No orders found:", result.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (gridRef.current && orderData.length > 0) {
      gridRef.current.innerHTML = ""; // Clear previous grid to prevent duplicates

      new Grid({
        columns: [
          { name: "#", width: "40px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Order ID", width: "100px", formatter: (_, row) => html(`<div class="text-base">${row.cells[1].data}</div>`) },
          { name: "Date & Time", width: "180px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Product Name", width: "200px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Total Amount", width: "120px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Payment Type", width: "120px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Method", width: "120px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        ],
        className: {
          th: "text-lg",
          td: "text-base",
        },
        pagination: { limit: 10 },
        search: true,
        data: orderData,
      }).render(gridRef.current);
    }
  }, [orderData]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Order History"
            links={[{ text: "Dashboard", link: "inventory" }]}
            active="Order History"
          />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card shadow-md p-4">
                <div ref={gridRef}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order_History;
