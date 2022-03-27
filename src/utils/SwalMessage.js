import Swal from 'sweetalert2';

const errorMessage = (title, message) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonText: 'Okay'
  });
}

const successMessage = (message) => {
  Swal.fire({
    title: 'Success!',
    // text: message,
    html: message,
    icon: 'success',
    confirmButtonText: 'Cool'
  });
}

const confirmMessage = (message) => {
  return Swal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      return result.value;
    }
  });
}

export { errorMessage, successMessage, confirmMessage };