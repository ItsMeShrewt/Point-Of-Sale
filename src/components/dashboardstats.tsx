function DashboardStats() {
  const stats = [
    {
      label: "Gross Revenue",
      value: "$2,427",
      change: 5.6,
      isPositive: true,
    },
    {
      label: "Avg Order Value",
      value: "$227.28",
      change: 4.5,
      isPositive: true,
    },
    {
      label: "Total Orders",
      value: "2,427",
      change: 1.2,
      isPositive: false,
    },
    {
      label: "Lifetime Value",
      value: "$2,427",
      change: 6.5,
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow border border-gray-100"
        >
          <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            {stat.value}
          </h3>
          <div className="flex items-center mt-2 text-sm">
            <span
              className={`font-medium ${
                stat.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.isPositive ? "▲" : "▼"} {stat.change}%
            </span>
            <span className="text-gray-500 ml-2">From last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
