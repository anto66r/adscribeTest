import {
  toast, Slide,
} from 'react-toastify';

type hookReturn = {
  doSuccessToast: (message: string) => void;
  doErrorToast: (message: string) => void;
}

const useToast = (): hookReturn => {
  const doSuccessToast = (message: string): void => {
    toast.success(message, {
      position: 'bottom-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      transition: Slide,
    });
  };
  const doErrorToast = (message: string): void => {
    toast.error(message, {
      position: 'bottom-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      transition: Slide,
      autoClose: false,
    });
  };
  return { doSuccessToast, doErrorToast };
};

export default useToast;
