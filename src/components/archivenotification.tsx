import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ToastNotification component for handling notifications
const ToastNotification: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastNotification;
