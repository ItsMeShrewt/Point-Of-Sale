import axios from "axios";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const Reports: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<Grid | null>(null);
  const [selectedReport, setSelectedReport] = useState("Order Report");
  const [reportData, setReportData] = useState<{
    [key: string]: any[][];
  }>({
    "Order Report": [],
    "Sales Report": [],
    "Inventory Report": [],
  });

  const [salesStartDate, setSalesStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today.toISOString().slice(0, 10);
  });
  const [salesEndDate, setSalesEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // Fetch Order Report data from the API
  useEffect(() => {
    if (selectedReport === "Order Report") {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://127.0.0.1/database/index.php/Order/read");
          const result = response.data;

          if (result.status && Array.isArray(result.data)) {
            const formattedData = result.data.map((order: any) => [
              order.id,
              order.order_date,
              order.product_name,
              `₱${parseFloat(order.total_amount).toFixed(2)}`,
              order.payment_type || "",
              order.method || "Unknown",
            ]);
            setReportData((prevData) => ({
              ...prevData,
              "Order Report": formattedData,
            }));
          } else {
            setReportData((prevData) => ({
              ...prevData,
              "Order Report": [],
            }));
            console.error("No orders found:", result.message);
          }
        } catch (error) {
          setReportData((prevData) => ({
            ...prevData,
            "Order Report": [],
          }));
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [selectedReport]);

  // Fetch Sales Report data from the API (by date range)
  useEffect(() => {
    if (selectedReport === "Sales Report" && salesStartDate && salesEndDate) {
      const fetchSales = async () => {
        try {
          // Use the new endpoint that returns sales grouped by date
          const response = await axios.get(
            `http://127.0.0.1/database/index.php/Order/totalSalesByDate?start_date=${salesStartDate}&end_date=${salesEndDate}`
          );
          const result = response.data;

          if (result.status && Array.isArray(result.sales)) {
            // Format: [["2024-05-28", "₱1,000"], ...]
            const formattedData = result.sales.map((row: any) => [
              row.date,
              `₱${parseFloat(row.total_sales || 0).toLocaleString()}`,
            ]);
            setReportData((prevData) => ({
              ...prevData,
              "Sales Report": formattedData,
            }));
          } else {
            setReportData((prevData) => ({
              ...prevData,
              "Sales Report": [],
            }));
            console.error("Failed to fetch total sales:", result.message);
          }
        } catch (error) {
          setReportData((prevData) => ({
            ...prevData,
            "Sales Report": [],
          }));
          console.error("Error fetching total sales:", error);
        }
      };

      fetchSales();
    }
  }, [selectedReport, salesStartDate, salesEndDate]);

  // Fetch Inventory Report data from the API
  useEffect(() => {
    if (selectedReport === "Inventory Report") {
      const fetchInventories = async () => {
        try {
          const [mainRes, leftRes, frontRes] = await Promise.all([
            axios.get("http://127.0.0.1/database/index.php/Inventory/read/main"),
            axios.get("http://127.0.0.1/database/index.php/Inventory/read/left"),
            axios.get("http://127.0.0.1/database/index.php/Inventory/read/front"),
          ]);

          const mainData = mainRes.data.status ? mainRes.data.data : [];
          const leftData = leftRes.data.status ? leftRes.data.data : [];
          const frontData = frontRes.data.status ? frontRes.data.data : [];

          const combinedData = [...mainData, ...leftData, ...frontData].map((item: any) => [
            item.section || "-",
            item.product_name || "-",
            item.brand || "-",
            item.description || "-",
            item.unit || "-",
            `₱${parseFloat(item.price || 0).toFixed(2)}`,
          ]);

          setReportData((prevData) => ({
            ...prevData,
            "Inventory Report": combinedData,
          }));
        } catch (error) {
          setReportData((prevData) => ({
            ...prevData,
            "Inventory Report": [],
          }));
          console.error("Error fetching inventory data:", error);
        }
      };

      fetchInventories();
    }
  }, [selectedReport]);

  useEffect(() => {
    if (gridRef.current) {
      // Destroy the previous Grid instance if it exists
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy();
      }

      const columns =
        selectedReport === "Order Report"
          ? [
              { name: "#", width: "40px" },
              { name: "Order ID", width: "100px" },
              { name: "Date & Time", width: "180px" },
              { name: "Product Name", width: "200px" },
              { name: "Total Amount", width: "120px" },
              { name: "Payment Type", width: "120px" },
              { name: "Method", width: "120px" },
            ]
          : selectedReport === "Sales Report"
          ? [
              { name: "#", width: "50px" },
              { name: "Date", width: "200px" },
              { name: "Total Sales", width: "150px" },
            ]
          : selectedReport === "Inventory Report"
          ? [
              { name: "#", width: "40px" },
              { name: "Section", width: "100px" },
              { name: "Product Name", width: "200px" },
              { name: "Brand", width: "150px" },
              { name: "Description", width: "200px" },
              { name: "Unit", width: "80px" },
              { name: "Price", width: "100px" },
            ]
          : [];

      const dataWithRowNumbers = Array.isArray(reportData[selectedReport])
        ? reportData[selectedReport].map((row, index) => [`${index + 1}.`, ...row])
        : [];

      if (gridRef.current) {
        gridRef.current.innerHTML = "";
        if (dataWithRowNumbers.length > 0) {
          gridInstanceRef.current = new Grid({
            columns,
            className: { th: "text-base" },
            pagination: { limit: 10 },
            search: true,
            data: dataWithRowNumbers,
          }).render(gridRef.current);
        }
      }
    }
  }, [selectedReport, reportData]);

  const handlePrint = () => {
    if (gridRef.current) {
      const printContent = gridRef.current.innerHTML;
      const selectedReportTitle = selectedReport.replace(/([A-Z])/g, " $1").trim();

      const base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // Replace with your Base64 string

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Report</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css">
              <style>
                @page {
                  size: auto;
                  margin: 20mm;
                }
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .gridjs-wrapper {
                  overflow: visible !important;
                }
                .gridjs-table {
                  width: 100% !important;
                  table-layout: auto !important;
                  border-collapse: collapse;
                }
                .gridjs-th, .gridjs-td {
                  border: 1px solid #ccc;
                  padding: 8px;
                  text-align: left;
                }
                .gridjs-pagination,
                .gridjs-search {
                  display: none !important;
                }
                .report-title {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .enterprise-title {
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                .logo {
                  display: block;
                  margin: 0 auto 10px auto;
                  width: 100px;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${base64Logo}" alt="Macky Enterprises Logo" class="logo" />
              <div class="enterprise-title">Macky Enterprises</div>
              <div class="report-title">${selectedReportTitle}</div>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <>
      <Header />
      <Sidemenu />

      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Reports"
            links={[{ text: " Dashboard", link: "inventory" }]}
            active="Reports"
            buttons={
              <button
                onClick={handlePrint}
                className="print-button bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-printer-line"></i> Print
              </button>
            }
          />

          <div className="mb-4">
            <select
              className="border px-4 py-2 rounded w-64"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="Order Report">Order Report</option>
              <option value="Sales Report">Sales Report</option>
              <option value="Inventory Report">Inventory Report</option>
            </select>
          </div>

          {selectedReport === "Sales Report" && (
            <div className="mb-4 flex gap-4 items-center">
              <label className="font-medium">Start Date:</label>
              <input
                type="date"
                className="border px-4 py-2 rounded"
                value={salesStartDate}
                onChange={(e) => setSalesStartDate(e.target.value)}
                max={salesEndDate}
              />
              <label className="font-medium">End Date:</label>
              <input
                type="date"
                className="border px-4 py-2 rounded"
                value={salesEndDate}
                onChange={(e) => setSalesEndDate(e.target.value)}
                min={salesStartDate}
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
          )}

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

export default Reports;
