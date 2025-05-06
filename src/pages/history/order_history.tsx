import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";


const Order_History: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect (() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          {
            name: "Order ID",
            width: "80px",
            formatter: (_, row) =>
              html(`
                <div class="flex items-center gap-3 text-base">
                <span>${row.cells[1].data}</span>
                </div>
                `)
          },
          { name: "Date & Time", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Category", width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Total Amount", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Payment Method", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Status", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
        ],
        className: {
          th: 'text-base'
        },
        pagination: { limit: 10},
        search: true,
        data: [
            ...[
              ['ORD-1001', '2025-03-18 14:25', 'Sand & Gravel', 2600, 'COD', 'Completed'],
              ['ORD-1002', '2025-03-19 10:45', 'Plywood', 6750, 'Cash', 'Completed'],
              ['ORD-1003', '2025-03-20 09:15', 'Cement', 3850, 'Cash', 'Pending'],
              ['ORD-1004', '2025-03-21 16:00', 'Hollow Blocks', 1500, 'COD', 'Completed'],
              ['ORD-1005', '2025-03-22 11:30', 'Steel Bars', 4800, 'Cash', 'Cancelled']
            ].map((row, index) => [(index + 1) + ".", ...row]),
        ],
      }).render(gridRef.current);
    }
  }, []);

  return (
    <>
        <Header />
        <Sidemenu />
        <div className="main-content app-content">
          <div className="container-fluid">
            <Breadcrumb
                title="Order History"
                links={[
                  { text: " Dashboard", link: "inventory" },
                ]}
                active="Order History"
            />

            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-12 col-span-12">
                <div className="box overflow-hidden main-content-card">
                  <div className="box-body p-5">
                    <div ref={gridRef}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Order_History;