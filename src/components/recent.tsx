import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef } from "react";

const TopSellingProducts = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.innerHTML = "";

      new Grid({
        columns: [
          { name: "#", width: "5px",
            formatter: (cell) => 
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Product Name", width: "35px",
            formatter: (cell) => 
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Quantity", width: "35px",
            formatter: (cell) => 
              html(`<span class="text-base">${cell}</span>`)
           },
        ],
        data: [
          ["1", "Plywood", "150"],
          ["2", "Cement", "120"],
          ["3", "Sand & Gravel", "100"],
          ["4", "Hollow Blocks", "90"],
        ],
        pagination: {
          limit: 4,
        },
        className: {
          th: 'bg-gray-100 text-gray-700 px-3 py-0 text-lg',
          td: 'text-base'
        },
      }).render(tableRef.current);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
      <h2 className="font-bold text-xl mb-4">Low Stocks</h2>
      <div className="overflow-x-auto" ref={tableRef}></div>
    </div>
  );
};

export default TopSellingProducts;
