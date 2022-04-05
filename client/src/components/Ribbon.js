import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey, setSearchOption, dataKeys, listType, listStatus}) {
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey} setSearchOption={setSearchOption} dataKeys={dataKeys} listType={listType} listStatus={listStatus}/>
    </nav>
  )
}
