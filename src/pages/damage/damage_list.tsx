import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link } from 'react-router-dom';

const Damage_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect (() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Damage ID", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
          },
          { name: "Product Name", width: "150px",
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
          { name: "Date", width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`)
           },
          {
              name: "Action",
              width: "60px",
              formatter: () =>
                html(`
                    <div class="flex justify-center gap-2">
                      <button class="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                        <i class="ri-pencil-line mr-1"></i>
                        <span class="px-1 text-base">Edit</span>
                      </button>
                  `)
          },
        ],
        className: {
          th: 'text-base'
        },
        pagination: { limit: 10},
        search: true,
        data: [

            ...[
              ["DMG-001", "Hollow Blocks", 15, "Cracked during delivery", "2025-03-18"],
              ["DMG-002", "Cement Bags", 5, "Wet packaging", "2025-03-17"],
              ["DMG-003", "Steel Bars 10mm", 2, "Bent during unloading", "2025-03-16"],
              ["DMG-004", "Plywood Sheets", 8, "Warped due to moisture", "2025-03-15"],
              ["DMG-005", "Paint Cans", 3, "Leaked in storage", "2025-03-14"]
            ].map((row, index) => [(index + 1) + ".", ...row]),
        ],
      }).render(gridRef.current);
    }
  }, []);

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
                  <Link to="/damages/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                    <i className="ri-add-line"></i> Add Damaged Product
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

export default Damage_List;