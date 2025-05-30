import axios from "axios";
import { Package, PhilippinePeso, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

function DashboardStats() {
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [totalUniqueProducts, setTotalUniqueProducts] = useState<number | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null); // State for total sales by day

  useEffect(() => {
    // Fetch total orders for today
    axios
      .get("http://127.0.0.1/database/index.php/Order/countOrders")
      .then((res) => {
        if (res.data?.status) {
          setTotalOrders(res.data.total_orders);
        } else {
          console.error("Failed to fetch total orders.");
        }
      })
      .catch((err) => console.error("Error fetching total orders:", err));

    // Fetch total unique products
    axios
      .get("http://127.0.0.1/database/index.php/Inventory/countUniqueProducts")
      .then((res) => {
        if (res.data?.status) {
          setTotalUniqueProducts(res.data.total_unique_products);
        } else {
          console.error("Failed to fetch total unique products.");
        }
      })
      .catch((err) => console.error("Error fetching total unique products:", err));

    // Fetch total sales by day
    axios
      .get("http://127.0.0.1/database/index.php/Order/totalSales")
      .then((res) => {
        if (res.data?.status) {
          setTotalSales(res.data.total_sales);
        } else {
          console.error("Failed to fetch total sales.");
        }
      })
      .catch((err) => console.error("Error fetching total sales:", err));
  }, []);

  const stats = [
    {
      label: "Total Sales", // Changed label
      value: totalSales !== null ? `${totalSales.toLocaleString()}` : "Loading...",
      isPositive: true,
      icon: PhilippinePeso,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Orders (Today)",
      value: totalOrders !== null ? totalOrders.toString() : "Loading...",
      isPositive: false,
      icon: ShoppingCart,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Total Unique Products",
      value: totalUniqueProducts !== null ? totalUniqueProducts.toString() : "Loading...",
      isPositive: true,
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-md shadow border border-gray-100"
          >
            <p className="text-base text-gray-500 font-medium">{stat.label}</p>
            <div className="flex items-center gap-3 mt-2">
              <div
                className={`rounded-full p-2 ${stat.color} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;
