import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Reports: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px" },
          {
            name: "ID",
            width: "100px",
            formatter: (_, row) =>
              html(
                `<div class="flex items-center gap-3">
                  <span>${row.cells[1].data}</span>
                </div>`
              ),
          },
          { name: "Date & Time", width: "150px" },
          { name: "Type", width: "100px" },
          { name: "Category", width: "100px" },
          { name: "Product", width: "150px" },
          { name: "Qty", width: "80px" },
          { name: "Amount", width: "80px" },
          { name: "Payment", width: "100px" },
          { name: "Status", width: "100px" },
          {
            name: "Action",
            width: "110px",
            formatter: () =>
              html(`
                <div class="flex justify-center gap-2">
                  <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                    <i class="ri-pencil-line mr-1"></i>
                    <span class="px-1">Edit</span>
                  </button>
                  <button class="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
                    <i class="ri-delete-bin-line mr-1"></i>
                    <span class="px-1">Delete</span>
                  </button>
                </div>
              `),
          },
        ],
        pagination: { limit: 10 },
        search: true,
        sort: true,
        data: [
          ...[
            [
              "ORD-001",
              "2025-03-18 10:30 AM",
              "Sale",
              "Cement",
              "Portland Cement",
              10,
              5000,
              "Cash",
              "Completed",
            ],
            [
              "DMG-001",
              "2025-03-18 02:00 PM",
              "Damage",
              "Steel",
              "Rebar 16mm",
              5,
              1500,
              "-",
              "Damaged",
            ],
            [
              "STK-001",
              "2025-03-17 09:00 AM",
              "Stock In",
              "Gravel",
              "Coarse Gravel",
              100,
              "-",
              "-",
              "Stocked In",
            ],
            [
              "STK-002",
              "2025-03-18 04:00 PM",
              "Stock Out",
              "Cement",
              "Portland Cement",
              20,
              "-",
              "-",
              "Stocked Out",
            ],
          ].map((row, index) => [`${index + 1}.`, ...row]),
        ],
      }).render(gridRef.current);
    }
  }, []);

  return (
    <>
      <style>
        {`
          @media print {
            /* Hide the header, sidebar, breadcrumb, buttons, etc., if you want */
            header, .sidemenu, .breadcrumb, .print-button {
              display: none !important;
            }

            /* Hide pagination controls and search box */
            .gridjs-pages,
            .gridjs-pagination,
            .gridjs-search {
              display: none !important;
            }

            /* Optional: Stretch the table to full width on print */
            .gridjs-container {
              width: 100% !important;
            }
          }
        `}
      </style>

      <Header />
      <Sidemenu />

      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Reports"
            links={[{ text: " Dashboard", link: "inventory" }]}
            active="Reports"
            buttons={
              <button
                onClick={() => window.print()}
                className="print-button bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-printer-line"></i> Print
              </button>
            }
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

export default Reports;
