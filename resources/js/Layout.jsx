import React from 'react';

import '../css/app.css'; 

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <span className="SWStarter" style={{'--green-teal': '#0ab463'}}>
          SWStarter
        </span>
      </header>
      
        <article>{children}</article>
    </main>
  )
}