import Swal from "sweetalert2";

export const showProcessAlert = (onConfirm: () => void) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will finalize the order and clear the list.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, process it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm(); // Call the onConfirm handler
      Swal.fire("Processed!", "The order has been finalized.", "success");
    }
  });
};

export const showCancelAlert = (onCancel: () => void) => {
  Swal.fire({
    title: "Cancel Order?",
    text: "This will discard all changes.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onCancel(); // Call the onCancel handler
      Swal.fire("Cancelled!", "The order has been discarded.", "success");
    }
  });
};
