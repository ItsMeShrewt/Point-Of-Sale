import axios from "axios";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Customer: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1/database/index.php/Order/getOrders");
      if (res.data.status) {
        setOrders(res.data.orders);
      } else {
        setOrders([]); // Just clear the orders, no popup
      }
    } catch (err) {
      console.error("Fetch error:", err);
      Swal.fire("Error", "Failed to fetch orders.", "error");
    }
  };

  const handleReturn = async (orderId: number) => {
    const { value: formValues } = await Swal.fire({
      title: "<span style='font-size: 24px;'>Return Item</span>",
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <label for="return-quantity">Quantity to Return</label>
          <input id="return-quantity" type="number" class="swal2-input" placeholder="Enter quantity..." min="1">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const quantityInput = document.getElementById("return-quantity") as HTMLInputElement;
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 1) {
          Swal.showValidationMessage("Please enter a valid quantity (1 or more).");
          return;
        }

        return { quantity };
      },
    });

    if (formValues) {
      try {
        const res = await axios.post(
          "http://127.0.0.1/database/index.php/Order/returnItem",
          {
            order_id: orderId,
            quantity: formValues.quantity, // Only send order_id and quantity
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data.status) {
          Swal.fire("Success", res.data.message, "success").then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire("Error", res.data.message, "error");
        }
      } catch (err) {
        console.error("Return error:", err);
        Swal.fire("Error", "Failed to process return.", "error");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && gridRef.current) {
      const grid = new Grid({
        columns: [
          {
            name: "Order ID",
            width: "125px",
            hidden: true,
            formatter: (_, row) => html(`<span class="text-base">${row.cells[0].data}</span>`),
          },
          {
            name: "Name",
            width: "125px",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[1].data}</span>`),
          },
          {
            name: "Address",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[2].data}</span>`),
          },
          {
            name: "Phone",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[3].data}</span>`),
          },
          {
            name: "Date",
            width: "150px",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[4].data}</span>`),
          },
          {
            name: "Product Name",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[5].data}</span>`),
          },
          {
            name: "Quantity",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[6].data}</span>`),
          },
          {
            name: "Amount",
            formatter: (_, row) =>
            html(`<span class="text-base">₱${Number(row.cells[7].data || 0).toLocaleString()}</span>`)
          },
          {
            name: "Payment Type",
            width: "135px",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[8].data}</span>`),
          },
          {
            name: "Method",
            formatter: (_, row) => html(`<span class="text-base">${row.cells[9].data}</span>`),
          },
          {
            name: "Action",
            formatter: (_, row) => {
              const orderId = row.cells[0].data;
              return html(`
                <button class="return-btn bg-green-500 text-white text-base px-2 py-1 rounded-md" data-id="${orderId}">
                  Return
                </button>
              `);
            },
          },
        ],
        className: { th: "text-base" },
        pagination: { limit: 5 },
        data: orders.map((order) => [
          order.id,
          order.customer_name,
          order.customer_address,
          order.customer_phone,
          order.order_date,
          order.product_name,
          order.quantity,
          order.total_amount,
          order.payment_type,
          order.method,
        ]),
      });

      grid.render(gridRef.current);

      gridRef.current.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.closest(".return-btn")) {
          const btn = target.closest(".return-btn") as HTMLElement;
          const orderId = parseInt(btn.getAttribute("data-id") || "0");
          if (orderId) handleReturn(orderId);
        }
      });
    }
  }, [orders]);

  return (
    <div className="box main-content-card shadow-lg rounded-lg bg-white min-h-[400px]">
      <div className="box-body p-5">
        <h2 className="font-bold text-xl mb-4">Order List</h2>
        <div ref={gridRef}></div>
      </div>
    </div>
  );
};

export default Customer;
