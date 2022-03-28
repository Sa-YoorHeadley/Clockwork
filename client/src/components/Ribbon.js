import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey}) {
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey}/>
    </nav>
  )
}
