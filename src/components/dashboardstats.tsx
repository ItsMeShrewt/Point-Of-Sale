import {
  Users,
  DollarSign,
  ShoppingCart,
  Package,
} from "lucide-react";

function DashboardStats() {
  const stats = [
    {
      label: "Customer Served",
      value: "12",
      isPositive: true,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Sales",
      value: "$227.28",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Orders",
      value: "24",
      isPositive: false,
      icon: ShoppingCart,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Total Items",
      value: "34",
      isPositive: true,
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-md shadow border border-gray-100"
          >
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
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
