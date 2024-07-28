import { useEffect, useState } from 'react';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || '',
  );

  useEffect(() => {
    if (searchQuery) localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const update = (value: string) => {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
  };

  return { searchQuery, update };
};
