import { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const Reports: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          {
            name: "ID",
            width: "100px",
            formatter: (_, row) =>
              html(
                `<div class="flex items-center gap-3 text-base">
                  <span>${row.cells[1].data}</span>
                </div>`
              ),
          },
          { name: "Date & Time", width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Type", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Category", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Product", width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Qty", width: "80px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Amount", width: "80px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Payment", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          { name: "Status", width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
        ],
        className: {
          th: 'text-base'
        },
        pagination: { limit: 10 },
        search: true,
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

  export default Reports;
