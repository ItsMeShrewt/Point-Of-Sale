import { useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const TopSellingProducts = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.innerHTML = "";

      new Grid({
        columns: [
          "#",
          "Product Name",
          "Units Sold",
          "Total Revenue",
        ],
        data: [
          ["1", "Plywood", "150", "₱67,500.00"],
          ["2", "Cement", "120", "₱46,200.00"],
          ["3", "Sand & Gravel", "100", "₱40,000.00"],
          ["4", "Hollow Blocks", "90", "₱31,500.00"],
        ],
        sort: true,
        pagination: {
          limit: 4,
        },
        className: {
          table: 'min-w-full text-sm text-left',
          th: 'bg-gray-100 text-gray-700 px-3 py-0',
          td: 'px-3 py-0 border-t',
        },        
      }).render(tableRef.current);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
      <h2 className="font-bold text-lg mb-4">Top Selling Products</h2>
      <div className="overflow-x-auto" ref={tableRef}></div>
    </div>
  );
};

export default TopSellingProducts;
