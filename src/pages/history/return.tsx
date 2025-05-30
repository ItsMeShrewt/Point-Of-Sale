import { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useNavigate, useLocation } from "react-router-dom";

interface ReturnFormData {
  orderId: string;
  productName: string;
  returnReason: string;
}

const ReturnPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, productName } = location.state || {}; // Get order details from navigation state

  const [formData, setFormData] = useState<ReturnFormData>({
    orderId: orderId || "",
    productName: productName || "",
    returnReason: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.returnReason) {
      Swal.fire("Error", "Please provide a reason for the return.", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1/database/index.php/Order/returnOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: formData.orderId,
          reason: formData.returnReason,
        }),
      });

      const result = await response.json();

      if (result.status) {
        Swal.fire("Success", "Return processed successfully.", "success").then(() => {
          navigate("/history/order_history"); // Redirect back to order history
        });
      } else {
        Swal.fire("Error", result.message || "Failed to process return.", "error");
      }
    } catch (error) {
      console.error("Error processing return:", error);
      Swal.fire("Error", "An error occurred while processing the return.", "error");
    }
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Return Product"
            links={[{ text: "Order History", link: "/history/order_history" }]}
            active="Return Product"
          />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">Order ID</label>
                      <input
                        type="text"
                        value={formData.orderId}
                        disabled
                        className="ti-form-input rounded-sm w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">Product Name</label>
                      <input
                        type="text"
                        value={formData.productName}
                        disabled
                        className="ti-form-input rounded-sm w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">Reason for Return</label>
                      <textarea
                        name="returnReason"
                        value={formData.returnReason}
                        onChange={handleChange}
                        className="ti-form-input rounded-sm w-full"
                        placeholder="Enter the reason for the return (e.g., damaged, wrong item)"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => navigate("/history/order_history")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Submit Return
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPage;