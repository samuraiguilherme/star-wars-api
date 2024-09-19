import React from 'react';
import { useSearchContext } from '../../contexts/searchContext';
import { ResultsTable } from './resultsTable';

export const SearchResults = () => {
  const {
    result,
    showResults,
  } = useSearchContext();

  return (
    <div className='results-container'>
      <div className='Results Text-Style'>
        Results {result?.count && showResults ? `(${result?.count})` : ''}
      </div>
      <hr />
      {showResults ? (
        <>
          {result?.count ? (
            <ResultsTable />
          ) : (
            <EmptyResults />
          )}
        </>
      ) : <EmptyResults />}
    </div>
  );
}

const EmptyResults = () => {
  const {
    isFetching,
    showResults,
  } = useSearchContext();

  return (
    <div className='empty-results'>
      <div 
        className='There-are-zero-matches-Use-the-form-to-search-for'
        style={{'--pinkish-grey': '#c4c4c4'}}
      >
        {isFetching && showResults ? 'Searching...' : (
          <>
            <div>
              There are zero matches.
            </div>
            <div>
              Use the form to search for People or Movies.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
