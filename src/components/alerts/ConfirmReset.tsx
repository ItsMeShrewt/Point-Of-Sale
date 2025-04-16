import Swal from 'sweetalert2';

interface ConfirmResetProps {
  onConfirm: () => void;
}

const ConfirmReset = ({ onConfirm }: ConfirmResetProps) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will clear all form fields!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, reset it!',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire('Reset!', 'The form has been cleared.', 'success');
    }
  });

  return null; // Since it's triggered, no need to render anything
};

export default ConfirmReset;
