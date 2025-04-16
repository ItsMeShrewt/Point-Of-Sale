import Swal from 'sweetalert2';

// Function for processing confirmation
export const showProcessAlert = async (): Promise<void> => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to process this transaction?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Process it!',
    cancelButtonText: 'No, Cancel',
  });

  if (result.isConfirmed) {
    await Swal.fire('Processed!', 'The transaction has been processed.', 'success');
  }
};

// Function for cancel confirmation
export const showCancelAlert = async (): Promise<void> => {
  const result = await Swal.fire({
    title: 'Cancel Transaction',
    text: 'Are you sure you want to cancel?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Cancel it!',
    cancelButtonText: 'No, Keep it',
  });

  if (result.isConfirmed) {
    await Swal.fire('Cancelled!', 'The transaction has been cancelled.', 'error');
  }
};
