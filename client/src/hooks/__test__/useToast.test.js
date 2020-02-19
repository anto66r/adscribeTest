import {
  renderHook,
} from '@testing-library/react-hooks';
import {
  toast, Slide,
} from 'react-toastify';

import useToast from '../useToast';

jest.mock('react-toastify');

describe('useToast', () => {
  test('calls success toast correctly', () => {
    const {
      result,
    } = renderHook(() => useToast());
    result.current.doSuccessToast('the success message');
    expect(toast.success).toHaveBeenCalledWith('the success message', {
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: 'bottom-right',
      transition: Slide,
    });
  });
  test('calls error toast correctly', () => {
    const {
      result,
    } = renderHook(() => useToast());
    result.current.doErrorToast('the error message');
    expect(toast.error).toHaveBeenCalledWith('the error message', {
      autoClose: false,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: 'bottom-right',
      transition: Slide,
    });
  });
});
