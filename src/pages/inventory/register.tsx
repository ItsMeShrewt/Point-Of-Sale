import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  postalCode: string;
  biography: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
  postalCode: "",
  biography: "",
};

function Inventory_Registration() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  useEffect(() => {
    if (showResetAlert) {
      Swal.fire({
        title: "Are you sure?",
        text: "This will reset all form fields!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reset it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          handleResetConfirm();
          Swal.fire("Reset!", "The form has been reset.", "success");
        }
        setShowResetAlert(false);
      });
    }
  }, [showResetAlert]);

  useEffect(() => {
    if (showSubmitAlert) {
      Swal.fire({
        title: "Submit Record?",
        text: "Please confirm to submit the form.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmitConfirm();
          Swal.fire("Submitted!", "The form has been submitted.", "success");
        }
        setShowSubmitAlert(false);
      });
    }
  }, [showSubmitAlert]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetConfirm = () => {
    setFormData(initialFormData);
  };

  const handleSubmitConfirm = () => {
    console.log("Form submitted", formData);
    // Add submit logic here
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSubmitAlert(true);
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Product Registration"
            links={[{ text: "Inventory", link: "/inventory" }]}
            active="Register Product"
          />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <form onSubmit={handleSubmit}>

                    {/* 👉 Added Form Inputs Here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        ["Product Name", "productName", "bi bi-box"],
                        ["Category", "category", "bi bi-tags"],
                        ["Price", "price", "bi bi-currency-dollar"],
                        ["Quantity", "quantity", "bi bi-123"],
                        ["Description", "description", "bi bi-card-text"],
                        ["SKU", "sku", "bi bi-upc-scan"],
                        ["Supplier", "supplier", "bi bi-truck"],
                        ["Stock Status", "stockStatus", "bi bi-check-circle"],
                      ].map(([label, name, icon]) => (
                        <div key={name} className="relative">
                          <label className="block font-medium mb-1" htmlFor={name as string}>
                            {label}
                          </label>
                          <div className="relative">
                            <input
                              type={name === "email" ? "email" : "text"}
                              id={name as string}
                              name={name as string}
                              value={(formData as any)[name as string]}
                              onChange={handleChange}
                              className="ti-form-input rounded-sm ps-11 focus:z-10"
                              placeholder={`Enter ${label}`}
                            />
                            <i
                              className={`absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 ${icon}`}
                            ></i>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setShowResetAlert(true)}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                      >
                        <i className="bi bi-save"></i>
                        <span className="px-3">Submit Record</span>
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
}

export default Inventory_Registration;
