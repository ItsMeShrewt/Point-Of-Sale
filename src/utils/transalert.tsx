import { toast } from "react-toastify";

export const showCancelAlert = (onCancel: () => void) => {
  toast.warn("Transaction canceled.", {
    position: "top-right",
    autoClose: 3000,
    style: {
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      fontWeight: 600, // semibold
    },
  });

  onCancel();
};
