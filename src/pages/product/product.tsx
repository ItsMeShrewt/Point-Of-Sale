import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";


const Product_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "35px",
            formatter: (cell) =>
              html(`<span class="text-base text-center">${cell}</span>`),
           },
          {
            name: "Category",
            width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Brand",
            width: "200px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Description",
            width: "150px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Unit",
            width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Price",
            width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Quantity",
            width: "100px",
            formatter: (cell) =>
              html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Status",
            width: "100px",
            formatter: (cell) => {
              let bgClass = "";
              let textClass = "text-white"; // default white text for contrast
          
              switch (cell) {
                case "Available":
                  bgClass = "bg-green-500";
                  break;
                case "Low Stock":
                  bgClass = "bg-yellow-300 text-black"; // better contrast with yellow
                  textClass = "";
                  break;
                case "Out of Stock":
                  bgClass = "bg-red-600";
                  break;
                default:
                  bgClass = "bg-gray-400";
              }
          
              return html(`
                <div class="flex justify-center">
                  <span class="px-3 py-1 rounded-full text-base font-semibold ${bgClass} ${textClass}">
                    ${cell}
                  </span>
                </div>
              `);
            },
          },   
        ],
        className: {
          th: "text-lg font-semibold",
        },
        pagination: { limit: 10 },
        search: true,
        sort: true,
        data: [
          ["Plywood", "Marine", "¼ inch", "pc", 450, 0, "Out of Stock"],
          ["Plywood", "Marine", "½ inch", "pc", 780, 0, "Out of Stock"],
          ["Plywood", "Ordinary", "½ inch", "pc", 580, 0, "Out of Stock"],
          ["Plywood", "China", "¾ inch", "pc", 980, 0, "Out of Stock"],
          ["Plywood", "Top Forest", "¾ inch", "pc", 1250, 0, "Out of Stock"],
          ["Rebar", "Nippon Steel", "8 inch", "pc", 100, 0, "Out of Stock"],
          ["Mild Steel Square Hollow Bar", "BM Steel", "1x1", "pc", 400, 0, "Out of Stock"],
          ["Steel Wire", "KEI Industries Ltd", "Per kg", "kg", 90, 0, "Out of Stock"],
          ["Sand", "Holcim", "Per Cubic", "Cubic", 800, 0, "Out of Stock"],
          ["Gravel", "CEMEX", "Per Cubic", "Cubic", 1100, 0, "Out of Stock"],
          ["Sealant", "Bostik", "Vulca Seal", "1L", 750, 20, "Available"],
          ["Sealant", "Wilcon", "Sure Seal", "50ml", 180, 11, "Low Stock"],
          ["Adhesive", "Stikwel", "PVA Wood Glue", "250g", 260, 11, "Low Stock"],
          ["Paint", "Welcoat", "Flatwall Enamel - White", "Gallon", 800, 20, "Available"],
          ["Paint", "Rain or Shine", "Latex - Pistachio", "Gallon", 650, 20, "Available"],
          ["Paint", "Boysen", "Flatwall Enamel - White", "Gallon", 860, 19, "Available"],
          ["Paint", "Dutch Boy", "Roof Paint - Terra Cotta", "Gallon", 650, 16, "Available"],
          ["Paint", "Popular", "Flatwall Enamel - White", "Gallon", 650, 1, "Low Stock"],
          ["Paint", "Domino", "Quick Drying Enamel - Aluminum", "Gallon", 650, 3, "Low Stock"],
          ["Paint", "A-plus", "Acrylic Roof Paint - Baguio Green", "Gallon", 650, 5, "Low Stock"],
          ["Paint", "Triton", "Metal Primer - Red Oxide", "Gallon", 620, 8, "Low Stock"]
        ].map((row, index) => [`${index + 1}.`, ...row]),
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
                title="Manage Products"
                links={[
                  { text: " Dashboard", link: "inventory" },
                ]}
                active="Products"
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

export default Product_List;