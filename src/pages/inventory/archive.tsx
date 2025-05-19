import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Archived_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch archived data from backend
        const response = await axios.get(
          "http://127.0.0.1/database/index.php/Inventory/read_archived"
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
                name: "Section",
                width: "100px",
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
                formatter: (cell, row) => {
                  const isArchived = row.cells[10].data; // 10th cell is is_archived
                  const statusText = isArchived == 1 ? "Archived" : cell;
                  const colorClass = isArchived == 1 ? "text-red-600" : "text-green-600";
                  return html(
                    `<span class="flex justify-center text-base ${colorClass}">${statusText}</span>`
                  );
                },
              },
              {
                name: "Action",
                width: "160px",
                formatter: (_, row) => {
                  const id = row.cells[9].data; // 9th cell is id
                  return html(`
                    <div class="flex justify-center">
                      <button class="add-back-btn bg-green-600 text-white px-2 py-1 rounded-md text-base flex items-center" data-id="${id}">
                        <i class="ri-arrow-go-back-line mr-1"></i>
                        <span>&nbsp;Add to Inventory</span>
                      </button>
                    </div>
                  `);
                },
              },
              { name: "ID", hidden: true },
              { name: "is_archived", hidden: true }, // hidden column for archived flag
            ],
            data: result.data.map((item: any, index: number) => [
              `${index + 1}.`,
              item.section,
              item.product_name,
              item.brand,
              item.description,
              item.unit,
              item.price,
              item.quantity,
              item.status,
              item.id, // ID
              item.is_archived, // archived flag
            ]),
            className: { th: "text-lg" },
            pagination: { limit: 10 },
            search: true,
          });

          grid.render(gridRef.current);

          setTimeout(() => {
            // Attach event listeners for add-back buttons
            const addBackButtons = document.querySelectorAll(".add-back-btn");
            addBackButtons.forEach((btn) => {
              const newBtn = btn.cloneNode(true) as HTMLElement;
              btn.parentNode?.replaceChild(newBtn, btn);
              newBtn.addEventListener("click", async () => {
                const id = newBtn.getAttribute("data-id");
                if (id) {
                  // SweetAlert2 confirmation
                  const result = await Swal.fire({
                    title: "Add back to inventory?",
                    text: "Are you sure you want to add this item back to inventory?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes, add it!",
                    cancelButtonText: "Cancel",
                  });

                  if (result.isConfirmed) {
                    try {
                      // Call your API to "unarchive" or reactivate the item
                      await axios.put(`http://127.0.0.1/database/index.php/Inventory/unarchive/${id}`);

                      await Swal.fire({
                        title: "Success!",
                        text: "Item added back to inventory.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                      });

                      window.location.reload();
                    } catch (error) {
                      console.error("Failed to add back item:", error);
                      Swal.fire({
                        title: "Error",
                        text: "Failed to add the item back to inventory.",
                        icon: "error",
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
      }
    };

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
            active="Archive Products"
            buttons={
              <Link
                to="/inventory"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base flex items-center gap-2"
              >
                <i className="bi bi-arrow-left"></i> Back
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

export default Archived_List;
