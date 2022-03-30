import React from 'react'

export default function SearchBar({setSearchKey, setSearchOption,dataKeys}) {

    var genericFilter = {"Name":'', "Location":''}
    getFilterValues( dataKeys)

    let filteredKeys = dataKeys.map(key => {
      if(key.toLowerCase().includes('name')){
        return 'Name'
      }  
      else if(key.toLowerCase().includes('city') || key.toLowerCase().includes('state') || key.toLowerCase().includes('street')){
        return 'Location'
      }
      else if(key.toLowerCase().includes('id')){
        return 'ID'
      }
      else if(key.toLowerCase().includes('email')){
        return 'Email'
      }
      else if(key.toLowerCase().includes('phone')){
        return 'Phone Number'
      }
      else if(key.toLowerCase().includes('status')){
        return 'Status'
      }
      else {
        return 'Other'
      }  
    })
    filteredKeys = filteredKeys.filter((element, pos) => filteredKeys.indexOf(element) == pos)
    //console.log(filteredKeys)
    const optionElements = filteredKeys.map(element=> {
        return(
            element ? <option key={element} value = {element}>{element}</option> : null
        )
    })
    function getFilterValues(dataKeys){
      for (var f in genericFilter) {
        //console.log(genericFilter)
        var genericFilterKey = genericFilter[f].toString()
        for (var dk in dataKeys){
          var dataKeyString = dataKeys[dk].toString()
          //console.log(dataKeyString + "<<>>"+ genericFilterKey)
          if (dataKeyString.toLowerCase().search(genericFilterKey.toLowerCase())) genericFilter[genericFilterKey] = dataKeyString
        // if (dataKeys.toString().search(genericFilter[f].key().toLowercase())) genericFilter[genericFilter[f]] = genericFilter[genericFilter[f]] + " " +element
        }
      }
    }

    function handleChange(event){
        
        const selectedOption = event.target.value
        
        setSearchOption(selectedOption)
      }
  
    return (
      <div className= "searchbar">
        <label>search</label>
        <input type="text" onChange={(event)=>{setSearchKey(event.target.value)}} />
        <select onChange={handleChange} className='accounts-select'>
            {dataKeys && optionElements}
        </select>  
    </div>
      
  )
}
