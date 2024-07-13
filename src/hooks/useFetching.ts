import { useEffect, useState } from 'react';
import { AsyncFunction } from '../types/types';

const useFetching = <T>(
  callback?: AsyncFunction<T>,
  ...deps: unknown[]
): { isLoading: boolean; response: T } => {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (callback) {
      callback()
        .then((res) => {
          setResponse(res);
        })
        .catch(() => {
          throw new Error('Data fetching failed');
        })
        .finally(() => setIsLoading(false));
    }
  }, [...deps]);

  return { response: response as T, isLoading };
};

export default useFetching;
