import { useEffect, useState } from 'react';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery]);

  const update = (value: string) => {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
  };

  return { searchQuery, update };
};
