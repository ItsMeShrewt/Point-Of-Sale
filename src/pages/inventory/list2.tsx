import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import EditModal from "../../components/editmodal"; // Import EditModal
import AddModal from "../../components/addmodal"; // Import AddModal

const Inventory_List2: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Modal

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openAddModal = () => {
    setIsAddModalOpen(true); // Open the Add Modal
  };
  const closeAddModal = () => setIsAddModalOpen(false); // Close the Add Modal

  const inventory = [
    ["Lumber 2x2x3", "50 pcs", "Construction", "Available"],
    ["Umbrella Nails", "10 boxes", "Hardware", "Low Stock"],
    ["Roof", "20 sheets", "Construction", "Available"],
    ["Plywood 4x8", "30 sheets", "Construction", "Out of Stock"],
    ["Cement (40kg)", "100 bags", "Construction", "Available"],
    ["Paint 1L", "40 cans", "Painting", "Low Stock"],
  ];

  useEffect(() => {
    if (gridRef.current) {
      const grid = new Grid({
        columns: [
          { name: "#", width: "30px" },
          { name: "Product Name", width: "200px", formatter: (_, row) => html(`<span class="text-base">${row.cells[1].data}</span>`) },
          { name: "Quantity", width: "200px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          { name: "Category", width: "150px", formatter: (cell) => html(`<span class="text-base">${cell}</span>`) },
          {
            name: "Status",
            width: "80px",
              formatter: (cell) => {
                let bgClass = "";
                let textClass = "text-white";
                  switch (cell) {
                    case "Available": bgClass = "bg-green-500"; break;
                    case "Low Stock": bgClass = "bg-yellow-500 text-black"; textClass = ""; break;
                    case "Out of Stock": bgClass = "bg-red-600"; break;
                    default: bgClass = "bg-gray-400";
              }
                return html(`
                  <div class="flex justify-center">
                    <span class="px-3 py-1 rounded-full text-base ${bgClass} ${textClass}">
                      ${cell}
                    </span>
                  </div>
                `);
              },
            },
          { name: "Action", width: "100px", formatter: () => html(`
            <div class="flex justify-center gap-2">
              <button class="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs flex items-center edit-button">
                <i class="ri-pencil-line mr-1"></i><span class="px-1 text-base">Edit</span>
              </button>
              <button class="bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                <i class="ri-archive-line mr-1"></i><span class="px-1 text-base">Archive</span>
              </button>
            </div>
          `) },
        ],
        className: { th: "text-lg font-semibold" },
        pagination: { limit: 10 },
        search: true,
        sort: true,
        data: inventory.map((item, index) => [(index + 1) + ".", ...item]),
      });

      grid.render(gridRef.current);

      const observer = new MutationObserver(() => {
        const buttons = gridRef.current?.querySelectorAll(".edit-button");
        buttons?.forEach((btn) => {
          btn.removeEventListener("click", openEditModal);
          btn.addEventListener("click", openEditModal);
        });
      });

      observer.observe(gridRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [inventory]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Inventory"
            links={[{ text: " Dashboard", link: "inventory" }]}
            active="Warehouse A"
            buttons={
              <button
                onClick={openAddModal} // Open the AddModal on click
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-add-line"></i> Add New Material
              </button>
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

      {/* Modals */}
      <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} /> {/* Add Modal */}
    </>
  );
};

export default Inventory_List2;
