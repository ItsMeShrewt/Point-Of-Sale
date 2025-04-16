import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css"; // Import Grid.js theme CSS

const Customer: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px" },
          {
            name: "Customer Name",
            width: "80px",
            formatter: (_, row) =>
              html(`
                <div class="flex items-center gap-3">
                  <span>${row.cells[1].data}</span>
                </div>
              `),
          },
          { name: "Date & Time", width: "100px" },
          { name: "Product Name", width: "150px" },
          { name: "Total Amount", width: "100px" },
          { name: "Payment Method", width: "100px" },
          { name: "Status", width: "100px" },
          {
            name: "Action",
            width: "50px",
            formatter: () =>
              html(`
                <div class="relative flex justify-center gap-2">
                  <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center">
                    <i class="ri-more-fill"></i> <!-- "..." icon -->
                  </button>
                  <!-- Dropdown Menu -->
                  <div class="absolute hidden right-0 mt-2 w-32 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 group">
                    <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                      <i class="ri-pencil-line mr-2 text-yellow-500"></i> Edit
                    </button>
                    <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                      <i class="ri-delete-bin-line mr-2 text-red-500"></i> Delete
                    </button>
                  </div>
                </div>
              `),
          },
        ],
        pagination: { limit: 10 },
        sort: true,
        data: [
          ...[
            ['John Doe', 'March 18, 2025', 'Sand & Gravel', '₱2,600.00', 'COD', 'Delivery'],
            ['Jane Smith', 'March 19, 2025', 'Plywood', '₱6,750.00', 'Cash', 'Pick-up'],
            ['Robert Lee', 'March 20, 2025', 'Cement', '₱3,850.00', 'Cash', 'Delivery'],
            ['Emily Clark', 'March 21, 2025', 'Hollow Blocks', '₱1,500.00', 'COD', 'Pick-up'],
            ['David Kim', 'March 22, 2025', 'Steel Bars', '₱4,800.00', 'Cash', 'Delivery']
          ].map((row, index) => [(index + 1) + ".", ...row]),
        ],
      }).render(gridRef.current);
    }
  }, []);

  return (
    <div className="box main-content-card shadow-lg rounded-lg bg-white min-h-[400px]" style={{ height: "auto" }}>
      <div className="box-body p-5">
        <h2 className="font-bold text-lg mb-4">Order List</h2>
        <div ref={gridRef}></div>
      </div>
    </div>
  );
};

export default Customer;
