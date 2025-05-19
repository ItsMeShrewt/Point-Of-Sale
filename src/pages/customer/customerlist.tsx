import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link } from 'react-router-dom';
import axios from "axios";

const Customer_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/database/index.php/Customer/read");
        const result = response.data;
        console.log("Response:", result);

        if (result.status && gridRef.current) {
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
              {
                name: "Action",
                width: "75px",
                formatter: () =>
                  html(`
                    <div class="flex justify-center gap-2">
                      <button class="bg-yellow-500 text-white px-2 py-1 rounded-md text-base flex items-center">
                        <i class="ri-pencil-line mr-1"></i>
                        <span class="px-1">Edit</span>
                      </button>
                      <button class="bg-red-500 text-white px-2 py-1 rounded-md text-base flex items-center">
                        <i class="ri-delete-bin-line mr-1"></i>
                        <span class="px-1">Delete</span>
                      </button>
                    </div>
                  `),
              },
            ],
            className: { th: 'text-lg'},
            pagination: { limit: 10 },
            search: true,
            data: result.data.map((user: any, index: number) => [
              `${index + 1}.`,
              user.cust_name,
              user.address,
              user.phone,
            ]),
          }).render(gridRef.current);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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
            buttons={
              <Link to="/customer/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base flex items-center gap-2">
                <i className="ri-add-line"></i> Add Customer
              </Link>
            }
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

export default Customer_List;
