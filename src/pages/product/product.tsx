import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Loading from "../../components/loading";
import axios from "axios";

const Product_List: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  // Fetch from all three inventory endpoints and combine the data
  const fetchInventories = async () => {
    try {
      const [mainRes, leftRes, frontRes] = await Promise.all([
        axios.get("http://127.0.0.1/database/index.php/Inventory/read/main"),
        axios.get("http://127.0.0.1/database/index.php/Inventory/read/left"),
        axios.get("http://127.0.0.1/database/index.php/Inventory/read/front"),
      ]);

      // Extract data arrays safely
      const mainData = mainRes.data.status ? mainRes.data.data : [];
      const leftData = leftRes.data.status ? leftRes.data.data : [];
      const frontData = frontRes.data.status ? frontRes.data.data : [];

      const combinedData = [...mainData, ...leftData, ...frontData];
      setData(combinedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current) {
      new Grid({
        columns: [
          {
            name: "#",
            width: "35px",
            formatter: (cell) =>
              html(`<span class="text-base text-center">${cell}</span>`),
          },
          {
            name: "Section",
            width: "75px",
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
            width: "75px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Price",
            width: "75px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Quantity",
            width: "75px",
            formatter: (cell) => html(`<span class="text-base">${cell}</span>`),
          },
          {
            name: "Status",
            width: "100px",
            formatter: (cell) => {
              let color = "gray";
              if (cell === "Available") color = "green";
              else if (cell === "Low Stock") color = "orange";
              else if (cell === "Out of Stock") color = "red";
              return html(
                `<span class="flex justify-center text-base" style="color: ${color}; font-weight: 600;">${cell}</span>`
              );
            },
          },
        ],
        className: {
          th: "text-lg font-semibold",
        },
        pagination: { limit: 10 },
        search: true,
        data: data.map((item, index) => [
          `${index + 1}.`,
          item.section || "-",      // Adjust property names to your API response
          item.product_name || "-",      // Adjust property names to your API response
          item.brand || "-",
          item.description || "-",
          item.unit || "-",
          item.price || "-",
          item.quantity || "-",
          item.status || "-",
        ]),
      }).render(gridRef.current);
    }
  }, [loading, data]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Products"
            links={[{ text: " Dashboard", link: "inventory" }]}
            active="Products"
          />

          <Loading loading={loading} />

          {!loading && (
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-12 col-span-12">
                <div className="box overflow-hidden main-content-card">
                  <div className="box-body p-5">
                    <div ref={gridRef}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product_List;
