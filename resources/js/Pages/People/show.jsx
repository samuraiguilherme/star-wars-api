import React from 'react';
import { Link } from '@inertiajs/react';

import Layout from '../../Layout'
import '../../../css/entity.css';

export default function Show({
  id,
  name,
  birth_year,
  gender,
  eye_color,
  hair_color,
  height,
  mass,
  films,
}) {
  return (
    <Layout>
      <div className='main'>
        <div className='entity-container'>
          <h1>{name}</h1>
          <div className='entity-info'>
            <div className='column'>
              <div>
                <h2>Details</h2>
                <hr />
                <div>
                  <p>Birth Year: {birth_year}</p>
                  <p>Gender: {gender}</p>
                  <p>Eye color: {eye_color}</p>
                  <p>Hair color: {hair_color}</p>
                  <p>Height: {height}</p>
                  <p>Mass: {mass}</p>
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
                <h2>Movies</h2>
                <hr />
                {films.map(film => (
                  <div>
                    <Link
                      href={`/films/${film.id}`}
                    >
                      {film.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
