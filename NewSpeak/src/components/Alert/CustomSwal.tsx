import React from 'react';
import Swal from 'sweetalert2';

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

export const mySwal = (
  title: string,
  text: string,
  icon: SweetAlertIcon,
  footer: string = '',
  showConfirmButton: boolean = true,
  showCancelButton: boolean = false,
  confirmButtonText: string = '확인',
  cancelButtonText: string = '취소',
) => {
  return Swal.fire({
    title,
    text,
    footer,
    icon,
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
  });
};
