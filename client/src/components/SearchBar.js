import React, { useEffect, useState } from 'react'

export default function SearchBar({setSearchKey, setSearchOption, dataKeys, listType, listStatus}) {
    const [values, setValues] = useState({})
    const [filteredKeys, setFilteredKeys] = useState([])
    const [optionElements, setOptionElements] = useState([])

    useEffect(()=> {
      setValues(getValues)
      setOptionElements(getOptionElements)
    },[dataKeys, listType, listStatus])
    
    function getOptionElements(){
      return filteredKeys.map(element=> {
        return(
          <option key={element} value={element}>{element}</option>
        )
      })
    }
    function getValues(){
      let currentValues = {'Name': [], 'Location': [], 'ID': [], 'Email': [], 'Phone Number': [], 'Status': [], 'Other': []}
      if(filteredKeys){
        setFilteredKeys(dataKeys.map((key, index) => { 
          if(key.toLowerCase().includes('name')){
            currentValues['Name'].push(key)
            return 'Name'
          }  
          else if(key.toLowerCase().includes('city') || key.toLowerCase().includes('state') || key.toLowerCase().includes('street')){
            currentValues['Location'].push(key)
            return 'Location'
          }
          else if(key.toLowerCase().includes('id')){
            currentValues['ID'].push(key)
            return 'ID'
          }
          else if(key.toLowerCase().includes('email')){
            currentValues['Email'].push(key)
            return 'Email'
          }
          else if(key.toLowerCase().includes('phone')){
            currentValues['Phone Number'].push(key)
            return 'Phone Number'
          }
          else if(key.toLowerCase().includes('status')){
            currentValues['Status'].push(key) 
            return 'Status'
          }
          else {
            currentValues['Other'].push(key)
            return 'Other'
          }
        }))
        setFilteredKeys(prevFilteredKeys => {
          return prevFilteredKeys.filter((element, pos) => {
            return prevFilteredKeys.indexOf(element) == pos
          })
        })
        return currentValues
      }
    }

    function handleChange(event){
      const selectedOption = event.target.value
      setSearchOption(selectedOption)
    }
  
    return (
      <div className= "filter function">
        <h4 className='function-title'>Filter Current List</h4>
        <div className='function-inputs'>

        <div className='filter-text'>
            <input type="text" className='filter-text-input' onChange={(event)=>{setSearchKey(event.target.value)}} />
            <svg width="25" height="26" viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg" className='filter-text-icon'>
              <path d="M24.6582 22.1162L19.79 17.248C19.5703 17.0283 19.2725 16.9062 18.96 16.9062H18.1641C19.5117 15.1826 20.3125 13.0146 20.3125 10.6562C20.3125 5.0459 15.7666 0.5 10.1562 0.5C4.5459 0.5 0 5.0459 0 10.6562C0 16.2666 4.5459 20.8125 10.1562 20.8125C12.5146 20.8125 14.6826 20.0117 16.4062 18.6641V19.46C16.4062 19.7725 16.5283 20.0703 16.748 20.29L21.6162 25.1582C22.0752 25.6172 22.8174 25.6172 23.2715 25.1582L24.6533 23.7764C25.1123 23.3174 25.1123 22.5752 24.6582 22.1162ZM10.1562 16.9062C6.7041 16.9062 3.90625 14.1133 3.90625 10.6562C3.90625 7.2041 6.69922 4.40625 10.1562 4.40625C13.6084 4.40625 16.4062 7.19922 16.4062 10.6562C16.4062 14.1084 13.6133 16.9062 10.1562 16.9062Z" fill="#646464"/>
            </svg>
          </div>
          <select onChange={handleChange} className='filter-select'>
              <option value='' selected disabled hidden>~ Please Select Option ~</option>
              {optionElements !== undefined && optionElements}
          </select>  
        </div>
      </div>
      
  )
}
