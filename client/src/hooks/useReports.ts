import { useStore } from 'store';
import { setReports } from 'store/actions';
import { IReport } from 'types';

type hookReturn = {
  reports: IReport[];
  setReports: (roles: IReport[]) => void;
}

const useReports = (): hookReturn => {
  const [state, dispatch] = useStore();
  return {
    reports: state.domains?.reports || [],
    setReports: (reports: IReport[]): void => { dispatch(setReports(reports)); },
  };
};

export default useReports;
