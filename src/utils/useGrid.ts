import { useEffect } from "react";
import { Grid, html } from "gridjs";
// Import InventoryItem type from Inventory_List.tsx
import { InventoryItem } from "../pages/inventory/list"; // adjust the import path accordingly

interface UseGridProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  inventory: InventoryItem[]; // Use the InventoryItem type for inventory
  openEditModal: () => void;
  setConfirmArchive: (value: boolean) => void;
}

const useGrid = ({ gridRef, inventory, openEditModal, setConfirmArchive }: UseGridProps) => {
  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "35px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Category", width: "150px", formatter: (_, row) => html(`<span class="text-base">${row.cells[1].data}</span>`) },
          { name: "Brand", width: "150px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Description", width: "150px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Unit", width: "100px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Price", width: "80px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Quantity", width: "80px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          {
            name: "Status",
            width: "100px",
            formatter: (cell) => {
              let bgClass = "";
              let textClass = "text-white";
              switch (cell) {
                case "Available": bgClass = "bg-green-500"; break;
                case "Low Stock": bgClass = "bg-yellow-500 text-black"; textClass = ""; break;
                case "Out of Stock": bgClass = "bg-red-600"; break;
                default: bgClass = "bg-gray-400";
              }
              return html(`
                <div class="flex justify-center">
                  <span class="px-3 py-1 rounded-full text-base ${bgClass} ${textClass}">
                    ${cell}
                  </span>
                </div>
              `);
            },
          },
          {
            name: "Action",
            width: "120px",
            formatter: () => html(`
              <div class="flex justify-center gap-2">
                <button class="edit-button bg-yellow-500 text-white px-2 py-1 rounded-md text-base">
                  <i class="ri-pencil-line mr-1"></i>Edit
                </button>
                <button class="archive-button bg-red-500 text-white px-2 py-1 rounded-md text-base">
                  <i class="ri-archive-line mr-1"></i>Archive
                </button>
              </div>
            `),
          },
        ],
        className: { th: "text-lg font-semibold" },
        pagination: { limit: 10 },
        search: true,
        data: inventory.map((item, index) => [
          (index + 1) + ".",
          item.category,
          item.brand,
          item.description,
          item.unit,
          item.price,
          item.quantity,
          item.status,
        ]),
      });

      grid.render(gridRef.current);

      const observer = new MutationObserver(() => {
        const editBtns = gridRef.current?.querySelectorAll(".edit-button");
        editBtns?.forEach((btn) => {
          btn.removeEventListener("click", openEditModal);
          btn.addEventListener("click", openEditModal);
        });

        const archiveBtns = gridRef.current?.querySelectorAll(".archive-button");
        archiveBtns?.forEach((btn) => {
          btn.addEventListener("click", () => setConfirmArchive(true));
        });
      });

      observer.observe(gridRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [gridRef, inventory, openEditModal, setConfirmArchive]);
};

export default useGrid;
