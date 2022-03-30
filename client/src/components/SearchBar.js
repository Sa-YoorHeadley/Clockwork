import React from 'react'

export default function SearchBar({setSearchKey, setSearchOption,dataKeys}) {

    var genericFilter = {"Name":'', "Location":''}
    getFilterValues( dataKeys)
    console.log(JSON.stringify(genericFilter))
    const optionElements = dataKeys.map(element=> {
        return(
             
               <option key={element} value = {element}>{element}</option>
        )
    })
    function getFilterValues(dataKeys){
      for (var f in genericFilter) {
        console.log(genericFilter)
        var genericFilterKey = genericFilter[f].toString()
        for (var dk in dataKeys){
          var dataKeyString = dataKeys[dk].toString()
          console.log(dataKeyString + "<<>>"+ genericFilterKey)
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
