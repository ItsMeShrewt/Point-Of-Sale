import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="text-center p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;