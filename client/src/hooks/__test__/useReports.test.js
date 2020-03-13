import {
  renderHook,
} from '@testing-library/react-hooks';
import {
  useStore,
} from 'store';
import useReports from '../useReports';

jest.mock('store');
const mockDispatch = jest.fn();
useStore.mockImplementation(() => [{
  user: {
    userId: 'user 1',
  },
  domains: {
    reports: [{
      name: 'Report',
      id: '1',
      userId: '1',
    }],
  },
}, mockDispatch]);

describe('useReports', () => {
  test('should return all current reports', () => {
    const {
      result,
    } = renderHook(() => useReports());
    expect(result.current.reports).toEqual([{
      name: 'Report',
      id: '1',
      userId: '1',
    }]);
  });
  test('should return all current reports', () => {
    const {
      result,
    } = renderHook(() => useReports());
    result.current.setReports([{ name: 'New report', userId: '2' }]);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        reports: [{
          name: 'New report', userId: '2',
        }],
      },
      type: 'SET_REPORTS',
    });
  });
});
