import { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Reports: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handlePrintPreview = () => {
    const printContent = gridRef.current?.innerHTML;
  
    if (printContent) {
      const printWindow = window.open("", "_blank");
  
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Report</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css">
              <style>
                @page {
                  size: landscape;
                  margin: 20mm;
                }
                body {
                  font-family: sans-serif;
                  padding: 20px;
                  zoom: 75%;
                }
                .gridjs-wrapper {
                  overflow: visible !important;
                }
                .gridjs-table {
                  width: 100% !important;
                  table-layout: auto !important;
                  white-space: normal !important;
                  border-collapse: collapse;
                }
                .gridjs-th, .gridjs-td {
                  word-wrap: break-word;
                  white-space: normal !important;
                  border: 1px solid #ccc;
                  padding: 6px 8px;
                }
                .gridjs-pages,
                .gridjs-pagination,
                .gridjs-search {
                  display: none !important;
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };  

  useEffect(() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          {
            name: "ID",
            width: "100px",
            formatter: (_, row) =>
              html(`<div class="flex items-center gap-3 text-base"><span>${row.cells[1].data}</span></div>`),
          },
          { name: "Date & Time", width: "150px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Type", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Category", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Product", width: "150px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Qty", width: "80px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Amount", width: "80px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Payment", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Status", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
        ],
        className: { th: "text-base" },
        pagination: { limit: 10 },
        search: true,
        data: [
          ...[
            ["ORD-001", "2025-03-18 10:30 AM", "Sale", "Cement", "Portland Cement", 10, 5000, "Cash", "Completed"],
            ["DMG-001", "2025-03-18 02:00 PM", "Damage", "Steel", "Rebar 16mm", 5, 1500, "-", "Damaged"],
            ["STK-001", "2025-03-17 09:00 AM", "Stock In", "Gravel", "Coarse Gravel", 100, "-", "-", "Stocked In"],
            ["STK-002", "2025-03-18 04:00 PM", "Stock Out", "Cement", "Portland Cement", 20, "-", "-", "Stocked Out"],
          ].map((row, index) => [`${index + 1}.`, ...row]),
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
            title="Manage Reports"
            links={[{ text: " Dashboard", link: "inventory" }]}
            active="Reports"
            buttons={
              <button
                onClick={handlePrintPreview}
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
