import React from 'react'

export default function SearchBar({setSearchKey}) {
  return (
      <div className= "searchBar">
        <label>search</label>
        <input type="text" onChange={(event)=>{setSearchKey(event.target.value)}} />
      </div>
      
  )
}
