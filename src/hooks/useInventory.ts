// hooks/useInventory.ts
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useInventory = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch inventory data
  const fetchInventories = useCallback(async () => {
    setLoading(true);
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
  }, []);

  // Fetch inventory on initial mount
  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  // Return inventory, loading state, and refresh function
  return { inventory, loading, refreshInventory: fetchInventories };
};
