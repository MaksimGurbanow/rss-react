import { useEffect, useState } from 'react';
import { AsyncFunction } from '../types/types';

export const useFetching = <T>(
  callback?: AsyncFunction<T>,
  ...deps: unknown[]
): { isLoading: boolean; response: T; error: string } => {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setIsLoading(true);
    if (callback) {
      callback()
        .then((res) => {
          setResponse(res);
        })
        .catch(() => {
          setError('Data fetching failed');
        })
        .finally(() => setIsLoading(false));
    }
  }, [...deps]);

  return { response: response as T, isLoading, error };
};
