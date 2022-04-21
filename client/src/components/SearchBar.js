import React, { useEffect, useState } from 'react'

export default function SearchBar({ setFilterOptions, filterOptions }) {

    const keys = ['ID', 'Name', 'Location', 'Email', 'Phone Number', 'Status', 'Other']
    const optionElements = keys.map(element=> {
      return(
        <option key={element} value={element}>{element}</option>
      )
    })

    function changeFilterBy(event){
      const filterBy = event.target.value
      setFilterOptions(prevFilterOptions => {
        return{
          ...prevFilterOptions,
          filterBy
        }
      })
    }
    function changeFilterKey(event){
      const filterKey = event.target.value
      setFilterOptions(prevFilterOptions => {
        return{
          ...prevFilterOptions,
          filterKey
        }
      })
    }
  
    return (
      <div className= "filter function">
        <div className='function-inputs'>

        <div className='filter-text'>
            <input type="text" placeholder='Filter current results' className='filter-text-input' onChange={changeFilterKey} value={filterOptions.filterKey}/>
            <svg width="25" height="26" viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg" className='filter-text-icon'>
              <path d="M24.6582 22.1162L19.79 17.248C19.5703 17.0283 19.2725 16.9062 18.96 16.9062H18.1641C19.5117 15.1826 20.3125 13.0146 20.3125 10.6562C20.3125 5.0459 15.7666 0.5 10.1562 0.5C4.5459 0.5 0 5.0459 0 10.6562C0 16.2666 4.5459 20.8125 10.1562 20.8125C12.5146 20.8125 14.6826 20.0117 16.4062 18.6641V19.46C16.4062 19.7725 16.5283 20.0703 16.748 20.29L21.6162 25.1582C22.0752 25.6172 22.8174 25.6172 23.2715 25.1582L24.6533 23.7764C25.1123 23.3174 25.1123 22.5752 24.6582 22.1162ZM10.1562 16.9062C6.7041 16.9062 3.90625 14.1133 3.90625 10.6562C3.90625 7.2041 6.69922 4.40625 10.1562 4.40625C13.6084 4.40625 16.4062 7.19922 16.4062 10.6562C16.4062 14.1084 13.6133 16.9062 10.1562 16.9062Z" fill="#646464"/>
            </svg>
          </div>
          <select defaultValue={filterOptions.filterBy} onChange={changeFilterBy} className='filter-select'>
              {optionElements !== undefined && optionElements}
          </select>  
        </div>
      </div>
      
  )
}
