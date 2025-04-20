import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";


const Product_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect (() => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "10px"},
          {
            name: "Category",
            width: "200px",
            formatter: (_, row) =>
              html(`
                <div class="flex items-center gap-3">
                <span>${row.cells[1].data}</span>
                </div>
                `)
          },
          { name: "Brand", width: "200px" },
          { name: "Description", width: "150px" },
          { name: "Unit", width: "100px" },
          { name: "Price", width: "100px" },
          { name: "Quantity", width: "100px" },
          {
              name: "Action",
              width: "110px",
              formatter: () =>
                html(`
                    <div class="flex justify-center gap-2">
                      <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                        <i class="ri-pencil-line mr-1"></i>
                        <span class="px-1">Edit</span>
                      </button>
                      <button class="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
                        <i class="ri-delete-bin-line mr-1"></i>
                        <span class="px-1">Delete</span>
                      </button>
                  `)
          },
        ],
        pagination: { limit: 10},
        search: true,
        sort: true,
        data: [
            ...[
              ["Plywood", "Marine", "¼ inch", "pc", 450, 0],
              ["Plywood", "Marine", "½ inch", "pc", 780, 0],
              ["Plywood", "Ordinary", "½ inch", "pc", 580, 0],
              ["Plywood", "China", "¾ inch", "pc", 980, 0],
              ["Plywood", "Top Forest", "¾ inch", "pc", 1250, 0],
              ["Rebar", "Nippon Steel", "8 inch", "pc", 100, 0],
              ["Mild Steel Square Hollow Bar", "BM Steel", "1x1", "pc", 400, 0],
              ["Steel Wire", "KEI Industries Ltd", "Per kg", "kg", 90, 0],
              ["Sand", "Holcim", "Per Cubic", "Cubic", 800, 0],
              ["Gravel", "CEMEX", "Per Cubic", "Cubic", 1100, 0],
              ["Sealant", "Bostik", "Vulca Seal", "1L", 750, 20],
              ["Sealant", "Wilcon", "Sure Seal", "50ml", 180, 11],
              ["Adhesive", "Stikwel", "PVA Wood Glue", "250g", 260, 11],
              ["Paint", "Welcoat", "Flatwall Enamel - White", "Gallon", 800, 20],
              ["Paint", "Rain or Shine", "Latex - Pistachio", "Gallon", 650, 20],
              ["Paint", "Boysen", "Flatwall Enamel - White", "Gallon", 860, 19],
              ["Paint", "Dutch Boy", "Roof Paint - Terra Cotta", "Gallon", 650, 16],
              ["Paint", "Popular", "Flatwall Enamel - White", "Gallon", 650, 1],
              ["Paint", "Domino", "Quick Drying Enamel - Aluminum", "Gallon", 650, 3],
              ["Paint", "A-plus", "Acrylic Roof Paint - Baguio Green", "Gallon", 650, 5],
              ["Paint", "Triton", "Metal Primer - Red Oxide", "Gallon", 620, 8]
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