import React from 'react'

export default function SearchBar({setSearchKey, setSearchOption}) {
    function handleChange(event){
        
        const selectedOption = event.target.value
        
        setSearchOption(selectedOption)
      }
  
    return (
      <div className= "searchBar">
        <label>search</label>
        <input type="text" onChange={(event)=>{setSearchKey(event.target.value)}} />
        <h1>Filter</h1>
            <select onChange={handleChange} className='accounts-select'>
                <option default value = "Name">Name</option>
                <option value = "Location">Location</option>
                <option value = "Position">Position</option>
            </select>  
    </div>
      
  )
}
