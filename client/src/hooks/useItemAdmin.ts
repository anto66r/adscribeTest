import { FetchAction, FetchMethod } from 'types';
import { useFetch } from 'hooks';

const actionToMethod: { [key: string]: FetchMethod } = {
  DELETE: FetchMethod.DELETE,
  CREATE: FetchMethod.POST,
  UPDATE: FetchMethod.PATCH,
};

type ItemAndCallBack<T> = {
  item: T;
  onError?: (message: string) => void;
  onSuccess?: (collection: T[]) => void;
}

type hookReturn<T> = {
  doCreate: ({ item, onError, onSuccess }: ItemAndCallBack<T>) => Promise<void>;
  doDelete: ({ item, onError, onSuccess }: ItemAndCallBack<T>) => Promise<void>;
  doUpdate: ({ item, onError, onSuccess }: ItemAndCallBack<T>) => Promise<void>;
  loading: boolean;
}

function useItemAdmin<T>({
  endpoint,
}: {endpoint: string}): hookReturn<T> {
  const {
    loading, doFetch,
  } = useFetch<T>();

  const doDelete = async ({ item, onSuccess, onError }: ItemAndCallBack<T>): Promise<void> => {
    doFetch({
      endpoint,
      onSuccess,
      onError,
      payload: item,
      method: actionToMethod[FetchAction.DELETE],
    });
  };

  const doCreate = async ({ item, onSuccess, onError }: ItemAndCallBack<T>): Promise<void> => {
    doFetch({
      endpoint,
      onSuccess,
      onError,
      payload: item,
      method: actionToMethod[FetchAction.CREATE],
    });
  };

  const doUpdate = async ({ item, onSuccess, onError }: ItemAndCallBack<T>): Promise<void> => {
    doFetch({
      endpoint,
      onSuccess,
      onError,
      payload: item,
      method: actionToMethod[FetchAction.UPDATE],
    });
  };

  return {
    doDelete, doUpdate, doCreate, loading,
  };
};

export default useItemAdmin;
