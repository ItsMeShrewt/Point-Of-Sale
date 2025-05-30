import axios from "axios";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef } from "react";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Customer_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Add a state to trigger refresh
  const [refresh, setRefresh] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/database/index.php/Order/getCustomers");
        const result = response.data;
        console.log("Response:", result);

        if (result.status && gridRef.current) {
          // Clear previous grid if any
          gridRef.current.innerHTML = "";
          new Grid({
            columns: [
              { name: "#", width: "10px",
                formatter: (cell) =>
                  html(`<span class="text-base">${cell}</span>`)
               },
              { name: "Name", width: "150px",
                formatter: (cell) =>
                  html(`<span class="text-base">${cell}</span>`)
               },
              { name: "Address", width: "150px",
                formatter: (cell) =>
                  html(`<span class="text-base">${cell}</span>`)
               },
              { name: "Phone", width: "100px",
                formatter: (cell) =>
                  html(`<span class="text-base">${cell}</span>`)
               },
            ],
            className: { th: 'text-lg'},
            pagination: { limit: 10 },
            search: true,
            data: result.data.map((user: any, index: number) => [
              `${index + 1}.`,
              user.customer_name,
              user.customer_address,
              user.customer_phone,
            ]),
          }).render(gridRef.current);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [refresh]); // Depend on refresh

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Customers"
            links={[
              { text: " Dashboard", link: "/customer" },
            ]}
            active="Customers"
          />

          <button
            className="btn btn-primary mb-4"
            onClick={() => setRefresh((r) => r + 1)}
          >
            Refresh Customers
          </button>

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

export default Customer_List;
