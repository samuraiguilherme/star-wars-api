import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';

import Layout from '../../Layout'
import '../../../css/entity.css';

export default function Show({
  id,
  title,
  opening_crawl,
  people,
}) {
  const opening_crawl_memo = useMemo(() => {
    return opening_crawl.split('.').filter(f => !!f);
  }, [opening_crawl])

  return (
    <Layout>
      <div className='main'>
        <div className='entity-container'>
          <h1>{title}</h1>
          <div className='entity-info'>
            <div className='column'>
              <div>
                <h2>Opening Crawl</h2>
                <hr />
                <div className='opening-crawl'>
                  {opening_crawl_memo.map((oc, index) => (
                    <p key={index}>{oc}.</p>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  as='button'
                  type='button'
                  href={`/`}
                >
                  BACK TO SEARCH
                </Link>
              </div>
            </div>
            <div className='column'>
              <div>
                <h2>Characters</h2>
                <hr />
                {people.map((ppl, index) => (
                  <span
                    key={index}
                  >
                    <Link
                      href={`/people/${ppl.id}`}
                    >
                      {ppl.name}
                    </Link>,&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
