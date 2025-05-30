import axios from "axios";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Damage_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [damageData, setDamageData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch damaged products data from the backend
    const fetchDamageData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/database/index.php/Damage/getDamagedProducts");
        console.log("Response:", response); // Debugging statement
        if (response.status === 200) {
          const data = response.data.data || [];
          console.log("Fetched Data:", data); // Debugging statement
          setDamageData(
            data.map((item: any, index: number) => [
              (index + 1) + ".", // Row number
              item.product_name,
              item.section,
              item.quantity_damaged,
              item.damage_reason,
              item.damage_date, // Add the damage date
            ])
          );
        } else {
          console.error("Failed to fetch damaged products data.");
        }
      } catch (error) {
        console.error("Error fetching damaged products data:", error);
      }
    };

    fetchDamageData();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      console.log("Grid Data:", damageData); // Debugging statement
      new Grid({
        columns: [
          { name: "#", width: "50px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Product Name", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Section", width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Quantity Damaged", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Reason", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Date and Time", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
        ],
        className: {
          th: 'text-base'
        },
        pagination: { limit: 10 },
        search: true,
        data: damageData, // Use dynamic data
      }).render(gridRef.current);
    }
  }, [damageData]);

  return (
    <>
        <Header />
        <Sidemenu />
        <div className="main-content app-content">
          <div className="container-fluid">
            <Breadcrumb
                title="Damaged Products"
                links={[
                  { text: " Dashboard", link: "/damage" },
                ]}
                active="Damages"
                buttons={
                  <Link to="/damages/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base flex items-center gap-2">
                    <i className="ri-add-line"></i> Damaged Product
                  </Link>
                }
            />

            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-12 col-span-12">
                <div className="box overflow-hidden main-content-card">
                  <div className="box-body p-5">
                    {damageData.length === 0 ? (
                      <p className="text-center text-gray-500">No damaged products found.</p>
                    ) : (
                      <div ref={gridRef}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Damage_List;