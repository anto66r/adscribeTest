import {
  renderHook,
} from '@testing-library/react-hooks';

import usePermissions from '../usePermissions';

describe('usePermissions', () => {
  test('', () => {
    const {
      result,
    } = renderHook(() => usePermissions());
    // result.current.doSuccessToast('the success message');
    // expect(toast.success).toHaveBeenCalledWith('the success message', {
    //   closeOnClick: true,
    //   hideProgressBar: false,
    //   pauseOnHover: true,
    //   position: 'bottom-right',
    //   transition: Slide,
    // });
  });
});
