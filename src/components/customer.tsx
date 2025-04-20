import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css"; // Import Grid.js theme CSS
import Modal from "./customerdetails"; // Import the modal component

const Customer: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rowData = [
    ['John Doe', 'March 18, 2025', 'Sand & Gravel', '₱2,600.00', 'COD', 'Delivery'],
    ['Jane Smith', 'March 19, 2025', 'Plywood', '₱6,750.00', 'Cash', 'Pick-up'],
    ['Robert Lee', 'March 20, 2025', 'Cement', '₱3,850.00', 'Cash', 'Delivery'],
    ['Emily Clark', 'March 21, 2025', 'Hollow Blocks', '₱1,500.00', 'COD', 'Pick-up'],
    ['David Kim', 'March 22, 2025', 'Steel Bars', '₱4,800.00', 'Cash', 'Delivery'],
    ['David Kim', 'March 22, 2025', 'Steel Bars', '₱4,800.00', 'Cash', 'Delivery'],
  ];

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "10px" },
          {
            name: "Customer Name",
            width: "80px",
            formatter: (_, row) => html(`<span>${row.cells[1].data}</span>`),
          },
          { name: "Date & Time", width: "100px" },
          { name: "Product Name", width: "150px" },
          { name: "Total Amount", width: "100px" },
          { name: "Payment Method", width: "100px" },
          { name: "Status", width: "100px" },
          {
            name: "Action",
            width: "50px",
            formatter: (_, row) => {
              // Attach custom index here (first cell contains index like "1.")
              const index = parseInt(row.cells[0].data.toString()) - 1;
              return html(`
                <button class="action-btn bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs" data-index="${index}">
                  <i class="ri-more-fill"></i>
                </button>
              `);
            },
          },
        ],
        pagination: { limit: 10 },
        sort: true,
        data: rowData.map((row, index) => [`${index + 1}.`, ...row]),
      });

      grid.render(gridRef.current);

      setTimeout(() => {
        const buttons = document.querySelectorAll(".action-btn");
        buttons.forEach((btn) => {
          btn.addEventListener("click", (e: any) => {
            const index = parseInt(e.currentTarget.getAttribute("data-index"));
            setSelectedRow(rowData[index]);
            setIsModalOpen(true);
          });
        });
      }, 100);
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="box main-content-card shadow-lg rounded-lg bg-white min-h-[400px]">
      <div className="box-body p-5">
        <h2 className="font-bold text-lg mb-4">Order List</h2>
        <div ref={gridRef}></div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} orderDetails={selectedRow} />
    </div>
  );
};

export default Customer;
