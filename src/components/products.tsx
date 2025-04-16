// src/components/ProductTable.tsx
import React, { useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";

interface ProductTableProps {
  setOrders: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        description: string;
        price: number;
        quantity: number;
      }[]
    >
  >;
}

const ProductTable: React.FC<ProductTableProps> = ({ setOrders }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "55px" },
          {
            name: "Category",
            width: "100px",
            formatter: (_, row) =>
              html(
                `<div class="flex items-center gap-3">
                  <span>${row.cells[1].data}</span>
                </div>`
              ),
          },
          { name: "Brand", width: "125px" },
          { name: "Description", width: "125px" },
          { name: "Unit", width: "100px" },
          { name: "Price", width: "100px" },
          { name: "Quantity", width: "100px" },
          {
            name: "Action",
            width: "150px",
            formatter: (_, row) => {
              const productName = row.cells[2].data;
              const productDescription = row.cells[3].data;
              const productPrice = row.cells[5].data;
              const productQuantity = row.cells[6].data;

              const isDisabled = !productQuantity || Number(productQuantity) <= 0;
              const disabledAttr = isDisabled ? "disabled" : "";
              const disabledClass = isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600";

              return html(`
                <button
                  class="add-to-order ${disabledClass} text-white px-2 py-3 rounded-md text-s flex items-center"
                  data-name="${productName}"
                  data-description="${productDescription}"
                  data-price="${productPrice}"
                  ${disabledAttr}
                >
                  <i class="ri-add-line mr-1"></i>
                  <span class="px-1">Add to Order</span>
                </button>
              `);
            },
          },
        ],
        pagination: { limit: 7 },
        search: true,
        sort: true,
        data: [
          ["Plywood", "Marine", "¼ inch", "pc", 450, 0],
          ["Plywood", "Marine", "½ inch", "pc", 780, 5],
          ["Plywood", "Ordinary", "½ inch", "pc", 580, 3],
          ["Plywood", "China", "¾ inch", "pc", 980, 0],
          ["Plywood", "Top Forest", "¾ inch", "pc", 1250, 10],
          ["Rebar", "Nippon Steel", "8 inch", "pc", 100, 0],
          ["Mild Steel Square Hollow Bar", "BM Steel", "1x1", "pc", 400, 2],
          ["Steel Wire", "KEI Industries Ltd", "Per kg", "kg", 90, 0],
          ["Sand", "Holcim", "Per Cubic", "Cubic", 800, 0],
          ["Gravel", "CEMEX", "Per Cubic", "Cubic", 1100, 4],
        ].map((row, index) => [(index + 1) + ".", ...row]),
      });

      grid.render(gridRef.current);

      // Handle Add to Order Button Click
      const container = gridRef.current;
      const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const button = target.closest(".add-to-order") as HTMLElement;
        if (!button || button.hasAttribute("disabled")) return;

        const productName = button.getAttribute("data-name") || "";
        const productDescription = button.getAttribute("data-description") || "";
        const productPrice = parseFloat(button.getAttribute("data-price") || "0");

        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders];
          const existingIndex = updatedOrders.findIndex(
            (order) => order.name === productName && order.description === productDescription
          );

          if (existingIndex !== -1) {
            const existingOrder = updatedOrders[existingIndex];
            const newQuantity = (existingOrder.quantity || 1) + 1;
            updatedOrders[existingIndex] = {
              ...existingOrder,
              quantity: newQuantity,
              price: productPrice * newQuantity,
            };
          } else {
            updatedOrders.push({
              name: productName,
              description: productDescription,
              price: productPrice,
              quantity: 1,
            });
          }

          return updatedOrders;
        });
      };

      container.addEventListener("click", handleClick);
      return () => {
        container.removeEventListener("click", handleClick);
      };
    }
  }, [setOrders]);

  return <div ref={gridRef} className="w-full overflow-auto" />;
};

export default ProductTable;
