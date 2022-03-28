import React from 'react'

export default function SearchBar({setSearchKey}) {
  return (
      <div className= "searchbar">
        <label htmlFor='searchbar-input' className='searchbar-label'>Search</label>
        <input type="text" className='searchbar-input' id='searchbar-input' onChange={(event)=>{setSearchKey(event.target.value)}} />
      </div>
      
  )
}
