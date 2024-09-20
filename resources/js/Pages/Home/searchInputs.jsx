import React, { useMemo, useRef } from 'react';
import { useSearchContext } from '../../contexts/searchContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';

/* 
In a real world scenario I'd review the design in order to cut off the extra click for searching
and instead returned the results for on input change.
This component is implemented this way in order to do the autocomplete requirement within the same app. 
*/

export const SearchInputs = () => {
  const {
    searchType, setSearchType,
    searchTerm, setSearchTerm,
    setSearchTermPicked,
    showAutocomplete, setShowAutocomplete,
    showResults, setShowResults,
    isFetching,
    refetch,
    result,
  } = useSearchContext();

  const autocompleteRef = useRef(null);
  
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
    setSearchTermPicked(true);
    setShowAutocomplete(false);
    setSearchTerm(e.name ?? e.title);
  }

  const handleSubmit = () => {
    refetch();
    setShowResults(true);
  }

  useOutsideClick(autocompleteRef, () => {
    setShowAutocomplete(false);
  })

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
      {showAutocomplete && searchTerm ? (
        <div
          className='autocomplete-container'
          ref={autocompleteRef}
        >
          {result?.count && !isFetching ? (
            <div className=''>
              {result.results.map((res, index) => (
                <p
                  key={`autocomplete:${index}`}
                  className='autocomplete-option'
                  onClick={() => handleSearchClick(res)}
                >
                  {res.name || res.title}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className='button-container'>
        <button
          disabled={!searchTerm}
          onClick={handleSubmit}
        >
          {isFetching && showResults ? 'SEARCHING...' : 'SEARCH' }
        </button>
      </div>
    </div>
  );
}
