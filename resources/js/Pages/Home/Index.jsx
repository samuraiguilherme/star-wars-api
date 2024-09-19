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
    setShowResults,
  } = useSearchContext();

  useEffect(() => {
    setSearchType('people');
    setSearchTerm('');
    setShowResults(false);
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
