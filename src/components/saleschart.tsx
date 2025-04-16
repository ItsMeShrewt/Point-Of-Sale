import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 7000 },
  { name: "Fri", sales: 6000 },
  { name: "Sat", sales: 8000 },
  { name: "Sun", sales: 7500 },
];

const monthlyData = [
  { name: "Week 1", sales: 28000 },
  { name: "Week 2", sales: 32000 },
  { name: "Week 3", sales: 35000 },
  { name: "Week 4", sales: 40000 },
];

const yearlyData = [
  { name: "Jan", sales: 250000 },
  { name: "Feb", sales: 320000 },
  { name: "Mar", sales: 280000 },
  { name: "Apr", sales: 400000 },
  { name: "May", sales: 370000 },
  { name: "Jun", sales: 420000 },
  { name: "Jul", sales: 390000 },
  { name: "Aug", sales: 410000 },
  { name: "Sep", sales: 360000 },
  { name: "Oct", sales: 450000 },
  { name: "Nov", sales: 470000 },
  { name: "Dec", sales: 500000 },
];

const SalesChart: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(weeklyData);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterClick = (period: string) => {
    if (period === "week") {
      setFilteredData(weeklyData);
    } else if (period === "month") {
      setFilteredData(monthlyData);
    } else if (period === "year") {
      setFilteredData(yearlyData);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full max-w-4xl rounded-lg bg-white shadow border p-6 overflow-visible">
      {/* Header with Total Sales on the left and Filter Sales dropdown on the right */}
      <div className="flex justify-between items-center mb-0">
        <div className="text-xl font-semibold">Total Sales</div>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
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
              <div className="py-1 text-sm text-gray-700">
                <button
                  onClick={() => handleFilterClick("week")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  This Week
                </button>
                <button
                  onClick={() => handleFilterClick("month")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  This Month
                </button>
                <button
                  onClick={() => handleFilterClick("year")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  This Year
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={263}>
        <BarChart data={filteredData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="sales"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]} // Rounded top corners
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
