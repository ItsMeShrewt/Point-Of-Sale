import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

interface FormData {
  id: string; // Add ID field
  productName: string;
  section: string; // Add Section field
  quantityDamaged: string;
  reason: string;
}

const initialFormData: FormData = {
  id: "", // Initialize ID
  productName: "",
  section: "", // Initialize Section
  quantityDamaged: "",
  reason: "",
};

function Damaged_Registration() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Automatically fetch product details when ID is entered
    if (name === "id" && value) {
      try {
        const response = await axios.get(`http://127.0.0.1/database/index.php/Inventory/getProductById/${value}`);
        if (response.status === 200) {
          const product = response.data;
          setFormData((prevFormData) => ({
            ...prevFormData,
            productName: product.product_name, // Automatically fill product name
            section: product.section, // Automatically fill section
          }));
        } else {
          Swal.fire({
            title: "Error",
            text: "Product not found. Please check the ID.",
            icon: "error",
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "An error occurred while fetching product details.",
          icon: "error",
        });
      }
    }
  };

  const handleResetConfirm = () => {
    setFormData(initialFormData);
  };

  const handleSubmitConfirm = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    try {
      console.log("Form submitted");
      const response = await axios.post(`http://127.0.0.1/database/index.php/Damage/damage/${formData.id}`, {
        reason: formData.reason,
        quantity_damaged: parseInt(formData.quantityDamaged, 10),
      });

      if (response.status === 200 && response.data.status) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Damaged product recorded successfully.",
          icon: "success",
        });
        setFormData(initialFormData); // Reset form after successful submission
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to record damaged product.",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred while submitting the form.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitConfirm();
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Damaged Product Registration"
            links={[{ text: "Damaged Product", link: "/damage" }]}
            active="Damaged Product"
            buttons={
              <Link to="/damages/damage_list" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                <i className="bi bi-arrow-left"></i> Back
              </Link>
            }
          />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ID */}
                      <div className="relative">
                        <label className="block font-medium mb-1" htmlFor="id">
                          Product ID
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                            placeholder="Enter Product ID"
                          />
                          <i className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 bi bi-upc-scan"></i>
                        </div>
                      </div>

                      {/* Product Name */}
                      <div className="relative">
                        <label className="block font-medium mb-1" htmlFor="productName">
                          Product Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                            placeholder="Enter Product Name"
                            disabled // Make this field read-only
                          />
                          <i className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 bi bi-box"></i>
                        </div>
                      </div>

                      {/* Section */}
                      <div className="relative">
                        <label className="block font-medium mb-1" htmlFor="section">
                          Section
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                            placeholder="Section"
                            disabled // Make this field read-only
                          />
                          <i className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 bi bi-grid"></i>
                        </div>
                      </div>

                      {/* Quantity Damaged */}
                      <div className="relative">
                        <label className="block font-medium mb-1" htmlFor="quantityDamaged">
                          Quantity Damaged
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="quantityDamaged"
                            name="quantityDamaged"
                            value={formData.quantityDamaged}
                            onChange={handleChange}
                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                            placeholder="Enter Quantity Damaged"
                          />
                          <i className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 bi bi-123"></i>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="relative">
                        <label className="block font-medium mb-1" htmlFor="reason">
                          Reason
                        </label>
                        <div className="relative">
                          <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                            placeholder="Enter Reason for Damage"
                          ></textarea>
                          <i className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 bi bi-exclamation-circle"></i>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setFormData(initialFormData)}
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

export default Damaged_Registration;
