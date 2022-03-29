import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey,setSearchOption}) {
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey} setSearchOption={setSearchOption}/>
    </nav>
  )
}
