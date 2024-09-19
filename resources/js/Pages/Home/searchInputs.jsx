import React, { useMemo } from 'react';
import { useSearchContext } from '../../contexts/searchContext';

export const SearchInputs = () => {
  
  const {
    searchType, setSearchType,
    searchTerm, setSearchTerm,
    showAutocomplete, setShowAutocomplete,
    setShowResults,
    isFetching,
    refetch,
    result,
  } = useSearchContext();
  
  const inputPlaceholder = useMemo(() => {
    switch(searchType) {
      case 'films':
        return 'e.g. A New Hope, The Empire Strikes Back';
      case 'people':
      default:
        return 'e.g. Chewbacca, Yoda, Boba Fett';
    }
  }, [searchType]);

  const handleSearchClick = (e) => {
    setShowAutocomplete(false);
    setSearchTerm(e.name ?? e.title);
  }

  const handleSubmit = () => {
    refetch();
    setShowResults(true);
    setShowAutocomplete(false);
  }

  return (
    <div className='SearchContainer'>
      <div className='What-are-you-searching-for'>
        What are you searching for?
      </div>
      <div className='input-group'>
        <div>
          <input
            type='radio'
            name='searchType'
            id='people'
            value='people'
            defaultChecked
            onChange={e => setSearchType(e.target.value)}
          />
          <label htmlFor="people">People</label>
        </div>
        <div>
          <input
            type='radio'
            name='searchType'
            id='films'
            value='films'
            onChange={e => setSearchType(e.target.value)}
          />
          <label htmlFor="films">Movies</label>
        </div>
      </div>
      <div className='input'>
        <input
          type='text'
          placeholder={inputPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        className={`autocomplete-container ${showAutocomplete ? '' : 'hide'}`}
      >
        {showAutocomplete && result?.count ? (
            <div className=''>
              {result.results.map(res => (
                <p
                  className='autocomplete-option'
                  onClick={() => handleSearchClick(res)}
                >
                  {res.name || res.title}
                </p>
              ))}
            </div>
          ) : null}
      </div>
      <div className='button-container'>
        <button
          disabled={isFetching || !searchTerm}
          onClick={handleSubmit}
        >
          {isFetching ? 'SEARCHING...' : 'SEARCH' }
        </button>
      </div>
    </div>
  );
}
