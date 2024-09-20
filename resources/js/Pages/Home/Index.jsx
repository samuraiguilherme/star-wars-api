import React, { useEffect } from 'react';

import Layout from '../../Layout'
import { SearchInputs } from './searchInputs';
import { SearchResults } from './searchResults';
import { useSearchContext } from '../../contexts/searchContext';

import './home.css';

export default function Index() {
  const {
    setSearchType,
    setSearchTerm,
    setPrevSearchTerm,
    setSearchTermPicked,
    setShowResults,
    setShowAutocomplete,
  } = useSearchContext();

  useEffect(() => {
    setSearchType('people');
    setSearchTerm('');
    setPrevSearchTerm('');
    setSearchTermPicked(false);
    setShowResults(false);
    setShowAutocomplete(false);
  }, [])
  
  return (
    <Layout>
      <div className='main'>
        <SearchInputs />
        <SearchResults />
      </div>
    </Layout>
  )
}
