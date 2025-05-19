import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrums";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link } from "react-router-dom";
import axios from "axios";

interface FormData {
  cust_name: string;
  address: string;
  phone: string;
}

const initialFormData: FormData = {
  cust_name: "",
  address: "",
  phone: "",
};

function Customer_Registration() {
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
        }
        setShowSubmitAlert(false);
      });
    }
  }, [showSubmitAlert]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetConfirm = () => {
    setFormData(initialFormData);
  };

  const handleSubmitConfirm = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1/database/index.php/Customer/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        Swal.fire("Submitted!", response.data.message, "success");
        setFormData(initialFormData);
      } else {
        Swal.fire("Error!", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to submit data.", "error");
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
            title="Customer Registration"
            links={[{ text: "Customer List", link: "/customer/customerlist" }]}
            active="Customer Registration"
            buttons={
              <Link
                to="/customer/customerlist"
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
                        ["Customer Name", "cust_name", "bi bi-person-fill"],
                        ["Address", "address", "bi bi-geo-fill"],
                        ["Phone Number", "phone", "bi bi-telephone-fill"],
                      ].map(([label, name, icon]) => (
                        <div key={name} className="relative">
                          <label
                            className="block font-medium mb-1 text-base"
                            htmlFor={name}
                          >
                            {label}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id={name}
                              name={name}
                              value={(formData as any)[name]}
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
                        className="bg-gray-300 px-4 py-2 rounded-md text-base"
                        onClick={() => setShowResetAlert(true)}
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

export default Customer_Registration;
