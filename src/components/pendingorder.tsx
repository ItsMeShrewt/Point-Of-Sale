// src/components/PendingOrder.tsx
import React, { useEffect, useRef } from "react";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface PendingOrderProps {
  orders: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}

const PendingOrder: React.FC<PendingOrderProps> = ({ orders }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = new Grid({
      columns: [
        { name: "#", width: "40px" },
        { name: "Name" },
        { name: "Description" },
        { name: "Quantity", width: "100px" },
        { name: "Price", width: "100px" },
        { name: "Total", width: "120px" },
      ],
      data: orders.map((order, index) => [
        index + 1,
        order.name,
        order.description,
        order.quantity,
        order.price.toFixed(2),
        (order.quantity * order.price).toFixed(2),
      ]),
      pagination: { limit: 7 },
      search: false,
      sort: true,
    });

    grid.render(gridRef.current);
  }, [orders]);

  return <div ref={gridRef} className="w-full overflow-auto" />;
};

export default PendingOrder;
