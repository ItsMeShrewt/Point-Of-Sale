import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  productName: string;
  brand: string;
  description: string;
  unit: string;
  price: string;
  quantity: string;
  section: string;
}

const initialFormData: FormData = {
  productName: "",
  brand: "",
  description: "",
  unit: "",
  price: "",
  quantity: "",
  section: "",
};

function Addmaterial() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  const navigate = useNavigate();

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
          setFormData(initialFormData);
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
        }
        setShowSubmitAlert(false);
      });
    }
  }, [showSubmitAlert]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if ((name === "quantity" || name === "price") && value === "0") return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitConfirm = async () => {
    const { productName, brand, description, unit, price, quantity, section } = formData;

    if (
      !productName.trim() ||
      !brand.trim() ||
      !description.trim() ||
      !unit.trim() ||
      !price.trim() ||
      !quantity.trim() ||
      !section.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (parseFloat(price) <= 0 || parseInt(quantity, 10) <= 0) {
      toast.error("Price and Quantity must be greater than 0.");
      return;
    }

    const payload = {
      section,
      _productname: productName.trim(),
      brand: brand.trim(),
      description: description.trim(),
      unit: unit.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1/database/index.php/Inventory/add",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status) {
        toast.success("Material added successfully!", {
          position: "top-right",
          autoClose: 3000,
          style: { fontWeight: 600, fontSize: "17px" },
        });
        setFormData(initialFormData);

        // Navigate dynamically based on selected warehouse
        const warehouseMap: Record<string, string> = {
          Main: "/inventory",
          Left: "/inventory/list2",
          Front: "/inventory/list3",
        };
        const route = warehouseMap[section] || "/";
        navigate(route);
      } else {
        toast.error(response.data.message || "Failed to add material.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Server error. Please try again.");
    }
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
            title="Warehouse Material Registration"
            links={[{ text: "Warehouse", link: "/warehouse" }]}
            active="Register"
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
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        ["Product Name", "productName", "bi bi-box", "text"],
                        ["Brand", "brand", "bi bi-bookmark", "text"],
                        ["Description", "description", "bi bi-card-text", "text"],
                        ["Unit", "unit", "bi bi-rulers", "text"],
                        ["Price", "price", "bi bi-currency-dollar", "number"],
                        ["Quantity", "quantity", "bi bi-123", "number"],
                      ].map(([label, name, icon, type]) => (
                        <div key={name} className="relative">
                          <label htmlFor={name} className="block font-medium mb-1 text-base">
                            {label}
                          </label>
                          <div className="relative">
                            <input
                              type={type}
                              min={type === "number" ? "1" : undefined}
                              id={name}
                              name={name}
                              value={(formData as any)[name]}
                              onChange={handleChange}
                              className="ti-form-input rounded-sm ps-11 focus:z-10"
                              placeholder={`Enter ${label}`}
                              required
                            />
                            <i className={`absolute inset-y-0 start-0 flex items-center ps-4 ${icon}`}></i>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className=" relative mt-4 flex justify-center">
                    <div>
                      <label htmlFor="section" className="block font-medium mb-1 text-base text-start">
                        Warehouse
                      </label>
                      <div className="relative">
                        <select
                          id="section"
                          name="section"
                          value={formData.section}
                          onChange={handleChange}
                          className="ti-form-select rounded-sm ps-11"
                          style={{ width: '400px'}}
                          required
                        >
                          <option value="">Select Option</option>
                          <option value="Main">Main</option>
                          <option value="Left">Left</option>
                          <option value="Front">Front</option>
                        </select>
                        <i className="bi bi-building absolute inset-y-0 start-0 flex items-center ps-4"></i>
                      </div>
                    </div>
                  </div>


                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded-md text-base"
                        onClick={() => setShowResetAlert(true)}
                        disabled={JSON.stringify(formData) === JSON.stringify(initialFormData)}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-base flex items-center"
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

export default Addmaterial;
