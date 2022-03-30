import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey,setSearchOption,dataKeys}) {
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey} setSearchOption={setSearchOption} dataKeys ={dataKeys}/>
    </nav>
  )
}
