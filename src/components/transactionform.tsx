import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Customer {
  customer_name: string;
  customer_address: string;
  customer_phone: string;
}

interface DetailsProps {
  onClose: () => void;
  onProcess: (
    name: string,
    address?: string,
    phone?: string,
    method?: string,
    paymentType?: string,
    deliveryFee?: number
  ) => void;
  subtotal: number; // 👈 Add this line
}

const Details: React.FC<DetailsProps> = ({ onClose, onProcess, subtotal }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [method, setMethod] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<string>(""); // Start as empty string

  // Automatically set delivery fee to 0 if subtotal >= 3000 and method is Delivery
  useEffect(() => {
    if (method === "Delivery" && subtotal >= 3000) {
      setDeliveryFee("0");
    }
  }, [method, subtotal]);

  useEffect(() => {
    // Fetch customer list for autofill
    axios
      .get("http://127.0.0.1/database/index.php/Order/create")
      .then((res) => {
        if (res.data?.status && Array.isArray(res.data.data)) {
          setCustomers(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const isFormValid =
    name.trim() !== "" &&
    method !== "" &&
    paymentType !== "" &&
    (method === "Delivery"
      ? address.trim() !== "" &&
        phone.trim() !== "" &&
        (deliveryFee === "" ? false : Number(deliveryFee) >= 0)
      : true);

  const handleProceed = () => {
    if (!isFormValid) {
      toast.error("Please complete all required fields.");
      return;
    }

    onProcess(
      name,
      method === "Delivery" ? address : undefined,
      method === "Delivery" ? phone : undefined,
      method,
      paymentType,
      method === "Delivery" ? Number(deliveryFee) : 0 // Convert to number
    );

    setName("");
    setAddress("");
    setPhone("");
    setMethod("");
    setPaymentType("");
    setDeliveryFee("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);

    const matchedCustomer = customers.find(
      (c) => c.customer_name.toLowerCase() === inputName.toLowerCase()
    );

    if (matchedCustomer) {
      setAddress(matchedCustomer.customer_address);
      setPhone(matchedCustomer.customer_phone);
    } else {
      setAddress("");
      setPhone("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-5">
        <h2 className="text-2xl font-bold text-center">Transaction Details</h2>
        <hr className="mb-2 h-1 bg-black border-0" />

        <div className="space-y-4">
          {/* Method */}
          <div>
            <label className="block text-base font-medium mb-1" htmlFor="method">
              Method
            </label>
            <select
              id="method"
              className="w-full border p-3 rounded text-lg font-medium"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="Pick-up">Pick-up</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-base font-medium mb-1" htmlFor="paymentType">
              Payment Type
            </label>
            <select
              id="paymentType"
              className="w-full border p-3 rounded text-lg font-medium"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Cash on Delivery" disabled={method === "Pick-up"}>
                Cash on Delivery
              </option>
            </select>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-base font-medium mb-1" htmlFor="customerName">
              Customer Name
            </label>
            <input
              id="customerName"
              list="customer-list"
              type="text"
              className="w-full border p-3 rounded text-lg font-medium"
              value={name}
              onChange={handleNameChange}
            />
            <datalist id="customer-list">
              {customers.map((cust, index) => (
                <option key={index} value={cust.customer_name} />
              ))}
            </datalist>
          </div>

          {/* Delivery Fields (only for Delivery) */}
          {method === "Delivery" && (
            <>
              <div>
                <label className="block text-base font-medium mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full border p-3 rounded font-medium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  className="w-full border p-3 rounded font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1" htmlFor="deliveryFee">
                  Delivery Fee
                  {method === "Delivery" && subtotal >= 3000 && (
                    <span className="ml-2 text-green-600 font-semibold">(Free Delivery!)</span>
                  )}
                </label>
                <input
                  id="deliveryFee"
                  type="number"
                  min={0}
                  className="w-full border p-3 rounded font-medium"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  disabled={method === "Delivery" && subtotal >= 3000}
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-3">
            <button
              className="px-4 py-2 bg-red-600 rounded-md text-white text-base hover:bg-red-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded-md text-base text-white transition ${
                isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!isFormValid}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
