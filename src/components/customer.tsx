import React, { useEffect, useRef} from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css"; // Import Grid.js theme CSS


const Customer: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);


  const rowData = [
    ['John Doe', 'March 18, 2025', 'Sand & Gravel', '₱2,600.00', 'COD', 'Delivery'],
    ['Jane Smith', 'March 19, 2025', 'Plywood', '₱6,750.00', 'Cash', 'Pick-up'],
    ['Robert Lee', 'March 20, 2025', 'Cement', '₱3,850.00', 'Cash', 'Delivery'],
    ['Emily Clark', 'March 21, 2025', 'Hollow Blocks', '₱1,500.00', 'COD', 'Pick-up'],
    ['David Kim', 'March 22, 2025', 'Steel Bars', '₱4,800.00', 'Cash', 'Delivery'],
  ];

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "10px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          {
            name: "Customer Name",
            width: "80px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Date", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Product Name", width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Total Amount", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Payment Type", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Method", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
        ],
        className: {
          th: 'text-lg'
        },
        pagination: { limit: 10 },
        data: rowData.map((row, index) => [`${index + 1}.`, ...row]),
      });
      grid.render(gridRef.current);
    }
  }, []);

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
