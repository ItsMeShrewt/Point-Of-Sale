// src/utils/sweetalert.ts
import Swal from 'sweetalert2';

/**
 * Confirm deletion dialog.
 * @param callback Function to run if confirmed
 */
export const showDeleteConfirm = (callback: () => void): void => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
      Swal.fire(
        'Deleted!',
        'Your item has been deleted.',
        'success'
      );
    }
  });
};
