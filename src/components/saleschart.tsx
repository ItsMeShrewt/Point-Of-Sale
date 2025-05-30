import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [period, setPeriod] = useState<string>("week");

  // Fetch sales data dynamically from the backend
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1/database/index.php/Order/getSalesByDate?period=${period}`);
        const data = await response.json();

        if (data.status) {
          // Format the data for the chart
          const formattedData = data.sales.map((item: any) => ({
            name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }), // Day name
            sales: item.total_sales,
          }));
          setFilteredData(formattedData);
        } else {
          console.error("Failed to fetch sales data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, [period]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterClick = (selectedPeriod: string) => {
    setPeriod(selectedPeriod); // Update the period (week, month, year)
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full max-w-4xl rounded-lg bg-white shadow border p-6 overflow-visible text-base">
      {/* Header */}
      <div className="flex justify-between items-center mb-0">
        <div className="text-xl font-semibold">Total Sales</div>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Filter Sales
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1 text-base text-gray-700">
                <button
                  onClick={() => handleFilterClick("week")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                >
                  This Week
                </button>
                <button
                  onClick={() => handleFilterClick("month")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                >
                  This Month
                </button>
                <button
                  onClick={() => handleFilterClick("year")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                >
                  This Year
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={filteredData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="text-base" />
          <YAxis className="text-base" />
          <Tooltip contentStyle={{ fontSize: "1rem" }} />
          <Bar
            dataKey="sales"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
