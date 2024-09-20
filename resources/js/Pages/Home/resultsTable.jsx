import React from 'react';
import { Link } from '@inertiajs/react'

import { useSearchContext } from '../../contexts/searchContext';

export const ResultsTable = () => {
  const {
    searchType,
    result,
  } = useSearchContext();

  return (
    <div className='results-table'>
      {result?.results.map((res, index) => {
        const split = res.url.split('/');
        const id = split[split.length - 2];

        return (
          <div
            key={index}
          >
            <div
              className='result-item'
            >
              <span className='result-title'>{res.name || res.title}</span>
              <div className='button-item'>
                <Link
                  as='button'
                  type='button'
                  href={`/${searchType}/${id}`}
                >
                  SEE DETAILS
                </Link>
              </div>
            </div>
            <hr />
          </div>
        )
      })}
    </div>
  );
}
