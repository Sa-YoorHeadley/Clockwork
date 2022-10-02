import React from 'react'

export default function Header({ loggedIn, setLoggedIn }) {
  return (
    <header className='header'>
        <a href='#' className='clockwork-logo-text'><h1>Clock<span>Work</span></h1></a>
        {loggedIn && <button className='btn logout' onClick={() => setLoggedIn(false)}>Logout</button>}
    </header>
  )
}
