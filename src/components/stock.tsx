import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef } from "react";

const Stock = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://127.0.0.1/database/index.php/Inventory/readstock'); 
        // Replace with your actual API URL
        const json = await response.json();

        if (json.status && json.data.length > 0) {
          const data = json.data.map((item: any, index: number) => [
            index + 1,
            item.product_name,
            item.quantity.toString(),
            item.status,
            item.section
          ]);

          if (tableRef.current) {
            tableRef.current.innerHTML = "";

            new Grid({
              columns: [
                { name: "#", width: "5px",
                  formatter: (cell) => html(`<span class="text-base">${cell}</span>`)
                },
                { name: "Product Name", width: "35px",
                  formatter: (cell) => html(`<span class="text-base">${cell}</span>`)
                },
                { name: "Quantity", width: "15px",
                  formatter: (cell) => html(`<span class="text-base">${cell}</span>`)
                },
                { name: "Status", width: "20px",
                  formatter: (cell) => {
                    let color = "gray";
                  
                    if (cell === "Low Stock") {
                      color = "orange";
                    } else if (cell === "Out of Stock") {
                      color = "red";
                    }
                  
                    return html(
                      `<span class="flex justify-center text-base" style="color: ${color}; font-weight: 600;">${cell}</span>`
                    );
                  }                  
                },
                { name: "Section", width: "20px",
                  formatter: (cell) => html(`<span class="text-base">${cell}</span>`)
                }
              ],
              data,
              pagination: {
                limit: 4,
              },
              className: {
                th: 'bg-gray-100 text-gray-700 px-3 py-0 text-lg',
                td: 'text-base'
              },
            }).render(tableRef.current);
          }
        }
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
      <h2 className="font-bold text-xl mb-4">Low & Out of Stock Items</h2>
      <div ref={tableRef} className="overflow-x-auto"></div>
    </div>
  );
};

export default Stock;
