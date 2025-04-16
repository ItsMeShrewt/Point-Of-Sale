import Swal from 'sweetalert2';

interface ConfirmSubmitProps {
  onConfirm: () => void;
}

const ConfirmSubmit = ({ onConfirm }: ConfirmSubmitProps) => {
  Swal.fire({
    title: 'Submit this record?',
    text: 'Please confirm you want to submit this information.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Submit',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire('Submitted!', 'The record has been successfully submitted.', 'success');
    }
  });

  return null;
};

export default ConfirmSubmit;
