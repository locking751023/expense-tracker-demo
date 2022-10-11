import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 1000,
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

export const deleteConfirm = () => {
  return MySwal.fire({
    title: '確定要刪除這筆記錄?',
    text: '刪除後無法復原!!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪除!',
  });
};
