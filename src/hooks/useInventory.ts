// hooks/useInventory.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useInventory = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const [mainRes, leftRes, frontRes] = await Promise.all([
          axios.get("http://127.0.0.1/database/index.php/Inventory/read/main"),
          axios.get("http://127.0.0.1/database/index.php/Inventory/read/left"),
          axios.get("http://127.0.0.1/database/index.php/Inventory/read/front"),
        ]);

        const mainData = mainRes.data.status ? mainRes.data.data : [];
        const leftData = leftRes.data.status ? leftRes.data.data : [];
        const frontData = frontRes.data.status ? frontRes.data.data : [];

        const combinedData = [...mainData, ...leftData, ...frontData];
        setInventory(combinedData);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  return { inventory, loading };
};
