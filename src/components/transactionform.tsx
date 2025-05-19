import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface Customer {
  cust_name: string;
  address: string;
  phone: string;
}

interface DetailsProps {
  onClose: () => void;
  onProcess: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose, onProcess }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [type, setType] = useState("");
  const [payType, setPayType] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1/database/index.php/Customer/read")
      .then((res) => {
        if (res.data?.status && Array.isArray(res.data.data)) {
          setCustomers(res.data.data);
        } else {
          toast.error("Failed to load customers.");
        }
      })
      .catch(() => toast.error("Failed to load customers."));
  }, []);

  const isFormValid =
    name.trim() !== "" &&
    type !== "" &&
    (type === "Delivery" ? address.trim() !== "" && fee.trim() !== "" : true) &&
    (payType === "Cash" || payType === "Cash on Delivery");

  const handleProceed = async () => {
    if (!isFormValid) {
      toast.error(
        "Please complete all required fields and select a valid payment type."
      );
      return;
    }

    const existingCustomer = customers.find(
      (c) => c.cust_name.toLowerCase() === name.toLowerCase()
    );

    if (!existingCustomer) {
      try {
        const response = await axios.post(
          "http://127.0.0.1/database/index.php/Customer/create",
          { cust_name: name, address, phone }
        );
        if (!response.data.status) {
          toast.error(response.data.message);
          return;
        }
      } catch {
        toast.error("Failed to add new customer.");
        return;
      }
    }

    toast.success(
      <div>
        <div className="text-base font-semibold mb-1">
          Transaction processed successfully!
        </div>
        <div className="text-base font-normal pl-4">
          <p>Name: {name}</p>
          <p>Type: {type}</p>
          {type === "Delivery" && (
            <>
              <p>Address: {address}</p>
              <p>Phone: {phone}</p>
              <p>Delivery Fee: ₱{fee}</p>
            </>
          )}
          <p>Payment Type: {payType}</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3500,
        style: {
          fontWeight: 600,
          fontSize: "17px",
          width: "375px",
          whiteSpace: "normal",
        },
      }
    );

    onProcess();
    onClose();

    setName("");
    setAddress("");
    setPhone("");
    setFee("");
    setType("");
    setPayType("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);

    const matchedCustomer = customers.find(
      (c) => c.cust_name.toLowerCase() === inputName.toLowerCase()
    );

    if (matchedCustomer) {
      setAddress(matchedCustomer.address);
      setPhone(matchedCustomer.phone);
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
                <option key={index} value={cust.cust_name} />
              ))}
            </datalist>
          </div>

          {/* Method */}
          <div>
            <label className="block text-base font-medium mb-1" htmlFor="methodType">
              Method
            </label>
            <select
              id="methodType"
              className="w-full border p-3 rounded text-lg font-medium"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={name.trim() === ""}
            >
              <option value="">-- Select Type --</option>
              <option value="Pick-up">Pick-up</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          {/* Payment Type */}
          {type && (
            <div>
              <label className="block text-base font-medium mb-1" htmlFor="payType">
                Payment Type
              </label>
              <select
                id="payType"
                className="w-full border p-3 rounded text-lg font-medium"
                value={payType}
                onChange={(e) => setPayType(e.target.value)}
              >
                <option value="">-- Select Payment Type --</option>
                <option value="Cash">Cash</option>
                <option value="Cash on Delivery" disabled={type === "Pick-up"}>
                  Cash on Delivery
                </option>
              </select>
            </div>
          )}

          {/* Delivery Fields */}
          {type === "Delivery" && (
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
                </label>
                <input
                  id="deliveryFee"
                  type="number"
                  className="w-full border p-3 rounded text-lg font-medium"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  min="0"
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
