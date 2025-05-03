import React, { useState, useRef } from "react";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import EditModal from "../../components/editmodal";
import AddModal from "../../components/addmodal";
import ToastNotification from "../../components/archivenotification.tsx";
import { toast } from "react-toastify";
import useGrid from "../../utils/useGrid"; // Import the custom hook

// Inventory_List.tsx

// Export the InventoryItem type for use in other files
export interface InventoryItem {
  category: string;
  brand: string;
  description: string;
  unit: string;
  price: number;
  quantity: number;
  status: string;
}


const Inventory_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const inventory: InventoryItem[] = [
    {category: "Plywood", brand: "Marine", description: "¼ inch", unit: "pc", price: 450, quantity: 0, status: "Out of Stock"},
    {category: "Plywood", brand: "Marine", description: "½ inch", unit: "pc", price: 780, quantity: 0, status: "Out of Stock"},
    {category: "Plywood", brand: "Ordinary", description: "½ inch", unit: "pc", price: 580, quantity: 0, status: "Out of Stock"},
    {category: "Plywood", brand: "China", description: "¾ inch", unit: "pc", price: 980, quantity: 0, status: "Out of Stock"},
    {category: "Plywood", brand: "Top Forest", description: "¾ inch", unit: "pc", price: 1250, quantity: 0, status: "Out of Stock"},
    {category: "Rebar", brand: "Nippon Steel", description: "8 inch", unit: "pc", price: 100, quantity: 0, status: "Out of Stock"},
    {category: "Mild Steel Square Hollow Bar", brand: "BM Steel", description: "1x1", unit: "pc", price: 400, quantity: 0, status: "Out of Stock"},
    {category: "Steel Wire", brand: "KEI Industries Ltd", description: "Per kg", unit: "kg", price: 90, quantity: 0, status: "Out of Stock"},
    {category: "Sand", brand: "Holcim", description: "Per Cubic", unit: "Cubic", price: 800, quantity: 0, status: "Out of Stock"},
    {category: "Gravel", brand: "CEMEX", description: "Per Cubic", unit: "Cubic", price: 1100, quantity: 0, status: "Out of Stock"},
    {category: "Sealant", brand: "Bostik", description: "Vulca Seal", unit: "1L", price: 750, quantity: 20, status: "Available"},
    {category: "Sealant", brand: "Wilcon", description: "Sure Seal", unit: "50ml", price: 180, quantity: 11, status: "Low Stock"},
    {category: "Adhesive", brand: "Stikwel", description: "PVA Wood Glue", unit: "250g", price: 260, quantity: 11, status: "Low Stock"},
    {category: "Paint", brand: "Welcoat", description: "Flatwall Enamel - White", unit: "Gallon", price: 800, quantity: 20, status: "Available"},
    {category: "Paint", brand: "Rain or Shine", description: "Latex - Pistachio", unit: "Gallon", price: 650, quantity: 20, status: "Available"},
    {category: "Paint", brand: "Boysen", description: "Flatwall Enamel - White", unit: "Gallon", price: 860, quantity: 19, status: "Available"},
    {category: "Paint", brand: "Dutch Boy", description: "Roof Paint - Terra Cotta", unit: "Gallon", price: 650, quantity: 16, status: "Available"},
    {category: "Paint", brand: "Popular", description: "Flatwall Enamel - White", unit: "Gallon", price: 650, quantity: 1, status: "Low Stock"},
    {category: "Paint", brand: "Domino", description: "Quick Drying Enamel - Aluminum", unit: "Gallon", price: 650, quantity: 3, status: "Low Stock"},
    {category: "Paint", brand: "A-plus", description: "Acrylic Roof Paint - Baguio Green", unit: "Gallon", price: 650, quantity: 5, status: "Low Stock"},
    {category: "Paint", brand: "Triton", description: "Metal Primer - Red Oxide", unit: "Gallon", price: 620, quantity: 8, status: "Low Stock"}
  ];
  

  // Use the custom hook to handle the grid setup
  useGrid({
    gridRef,
    inventory,
    openEditModal,
    setConfirmArchive,
  });

  const handleConfirmArchive = () => {
    setConfirmArchive(false);
    toast.success("Item archived successfully.", {
      position: "top-right",
      autoClose: 2000,
      style: { fontWeight: 600, fontSize: "17px" },
    });
  };

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
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-add-line"></i> Add New Material
              </button>
            }
          />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="box main-content-card overflow-hidden">
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
      <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} />

      {/* Archive Confirmation Modal */}
      {confirmArchive && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to archive this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmArchive}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setConfirmArchive(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add the ToastNotification Component here */}
      <ToastNotification />
    </>
  );
};

export default Inventory_List;
