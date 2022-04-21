import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({ setResultLimit, setFilterOptions, filterOptions }) {
  function changeLimit(event){
    setResultLimit(event.target.value)
  }
  return (
    <nav className="horizontal-navbar">
        <SearchBar setFilterOptions={setFilterOptions} filterOptions={filterOptions}/>
        
        <div className='limit function'>
          <h5 className='function-title'>Limit Results</h5>
          <select className='limit-select' defaultValue={50} onChange={changeLimit}>
                <option value={10} >10</option>
                <option value={15} >15</option>
                <option value={30} >30</option>
                <option value={50} >50</option>
                <option value={100} >100</option>
                <option value={200} >200</option>
          </select>
        </div>
    </nav>
  )
}
