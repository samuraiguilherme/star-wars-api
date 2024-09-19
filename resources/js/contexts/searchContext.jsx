import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchType, setSearchType] = useState('people');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const {
    isFetching,
    data: result,
    refetch,
  } = useQuery({
    queryKey: ['autocomplete'],
    queryFn: async () => {
      setShowAutocomplete(true);
      const resp = await fetch(`/autocomplete/${searchType}?search=${debouncedSearchTerm}`);
      const data = await resp.json();
      return data;
    },
    enabled: false,
  })

  useEffect(() => {
    if (debouncedSearchTerm?.length > 1 && !showAutocomplete) {
      refetch();
    }
  }, [debouncedSearchTerm, showAutocomplete])

  return (
    <SearchContext.Provider
      value={{
        searchType, setSearchType,
        searchTerm, setSearchTerm,
        showResults, setShowResults,
        showAutocomplete, setShowAutocomplete,
        isFetching,
        result,
        refetch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }

  return context;
}
