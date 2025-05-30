import axios from "axios";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Sales_History: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [salesData, setSalesData] = useState<any[]>([]); // State to store sales data

  // Fetch total sales data from the backend
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/database/index.php/Order/totalSales");
        if (response.data.status) {
          // Format the data for the grid
          const formattedData = [
            [response.data.date, `₱${parseFloat(response.data.total_sales).toLocaleString()}`],
          ];
          setSalesData(formattedData);
        } else {
          console.error("Failed to fetch total sales:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching total sales:", error);
      }
    };

    fetchTotalSales();
  }, []);

  // Render the grid when salesData is updated
  useEffect(() => {
    if (gridRef.current && salesData.length > 0) {
      new Grid({
        columns: [
          {
            name: "#",
            width: "50px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Date",
            width: "200px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Total Sales",
            width: "150px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
        ],
        className: {
          th: "text-base",
        },
        pagination: { limit: 10 },
        search: true,
        data: salesData.map((row, index) => [`${index + 1}.`, ...row]),
      }).render(gridRef.current);
    }
  }, [salesData]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Total Sales"
            links={[{ text: "Dashboard", link: "/dashboard" }]}
            active="Total Sales"
          />

          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <div ref={gridRef}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales_History;