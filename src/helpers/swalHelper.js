import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const toastHelper = (message, status, toastOpt) => {
  Toast.fire({
    title: message,
    icon: status,
    ...toastOpt,
  });
};
