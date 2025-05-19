import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Inventory_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1/database/index.php/Inventory/read/main"
      );
      const result = response.data;

      if (result.status && gridRef.current) {
        const grid = new Grid({
          columns: [
            {
              name: "#",
              width: "35px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Product Name",
              width: "200px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Brand",
              width: "200px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Description",
              width: "150px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Unit",
              width: "100px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Price",
              width: "100px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Quantity",
              width: "100px",
              formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
            },
            {
              name: "Status",
              width: "100px",
              formatter: (cell) => {
                let color = "gray";
            
                if (cell === "Available") {
                  color = "green";
                } else if (cell === "Low Stock") {
                  color = "orange";
                } else if (cell === "Out of Stock") {
                  color = "red";
                }
            
                return html(
                  `<span class="flex justify-center text-base" style="color: ${color}; font-weight: 600;">${cell}</span>`
                );
              },
            },            
            
            {
              name: "Action",
              width: "150px",
              formatter: (_, row) => {
                const id = row.cells[9].data;
                return html(`
                  <div class="flex justify-center gap-2">
                    <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded-md text-base flex items-center" data-id="${id}">
                      <i class="ri-pencil-line mr-1"></i>
                      <span>&nbsp;  Edit</span>
                    </button>
                    <button class="archive-btn bg-red-500 text-white px-2 py-1 rounded-md text-base flex items-center" data-id="${id}">
                      <i class="ri-archive-line mr-1"></i>
                      <span>&nbsp;Archive</span>
                    </button>
                  </div>
                `);
              },
            },
            { name: "ID", hidden: true },
          ],
          data: result.data.map((item: any, index: number) => [
            `${index + 1}.`,
            item.product_name,
            item.brand,
            item.description,
            item.unit,
            item.price,
            item.quantity,
            item.status,
            "", // Placeholder for Action buttons
            item.id, // ID for internal use
          ]),
          className: { th: "text-lg" },
          pagination: { limit: 10 },
          search: true,
        });

        grid.render(gridRef.current);

        // Attach event listeners for buttons after rendering grid
        setTimeout(() => {
          document.querySelectorAll(".edit-btn").forEach((btn) => {
            const newBtn = btn.cloneNode(true) as HTMLElement;
            btn.parentNode?.replaceChild(newBtn, btn);
            newBtn.addEventListener("click", () => {
              const id = newBtn.getAttribute("data-id");
              if (id) navigate(`/inventory/editmaterial/${id}`);
            });
          });

          document.querySelectorAll(".archive-btn").forEach((btn) => {
            const newBtn = btn.cloneNode(true) as HTMLElement;
            btn.parentNode?.replaceChild(newBtn, btn);
            newBtn.addEventListener("click", async () => {
              const id = newBtn.getAttribute("data-id");
              if (id) {
                const confirm = await Swal.fire({
                  title: "Are you sure?",
                  text: "You are about to archive this item.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, archive it!",
                });

                if (confirm.isConfirmed) {
                  try {
                    await axios.delete(
                      `http://127.0.0.1/database/index.php/Inventory/archive/${id}`
                    );

                    // Centered success alert without OK button, auto close
                      await Swal.fire({
                        title: "Success!",
                        text: "Item Archived.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                      });
                    

                    window.location.reload();
                  } catch (error) {
                    console.error("Archiving failed:", error);

                    // Centered error alert without OK button, auto close
                    await Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Failed to archive the item.",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                }
              }
            });
          });
        }, 100);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      await Swal.fire({
        icon: "error",
        title: "Error fetching data.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Inventory"
            links={[{ text: "Dashboard", link: "/inventory" }]}
            active="Warehouse Left"
            buttons={
              <div className="flex gap-3">
                <Link
                  to="/inventory/addmaterial"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base flex items-center gap-2"
                >
                  <i className="ri-add-line"></i> Add New Item
                </Link>
                <Link
                  to="/inventory/archive"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-base flex items-center gap-2"
                >
                  <i className="ri-archive-line"></i> View Archived
                </Link>
              </div>
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

export default Inventory_List;
