import { useEffect, useState } from 'react';

export default () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || '',
  );

  useEffect(() => {
    if (searchQuery) localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const update = (value: string) => {
    setSearchQuery(value);
  };

  return { searchQuery, update };
};
