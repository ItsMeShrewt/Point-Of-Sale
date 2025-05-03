import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 1500,
      style: {
        fontWeight: 600,
        fontSize: "15px",
      },
    });

    localStorage.removeItem("isAuthenticated"); // optional: clear session

    // Navigate right away
    navigate("/");
  }, [navigate]);

  return null; // No visible UI
};

export default Logout;
