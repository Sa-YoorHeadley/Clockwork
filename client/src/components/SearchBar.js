import React from 'react'

export default function SearchBar({setSearchKey, setSearchOption,dataKeys}) {

    var genericFilter = {"Name":'', "Location":''}
    getFilterValues( dataKeys)
    console.log(JSON.stringify(genericFilter))
    const optionElements = dataKeys.map(element,i=> {
        return(
             
               <option key={element} value = {element}>{genericFilter[index]}</option>
        )
    })
    function getFilterValues(dataKeys){
      var ok = Object.keys(genericFilter)
      
      for (var f = 0 ; f< ok.length; f++) {
        
        var genericFilterKey = ok[f]
        for (var dk in dataKeys){
          var dataKeyString = dataKeys[dk].toString()
        
          console.log(dataKeyString + "<<>>"+ genericFilterKey)
          if (dataKeyString.toLocaleLowerCase().search(genericFilterKey.toLocaleLowerCase()) > -1 ) {
            console.log("Match" + dataKeyString + "<<>>"+ genericFilterKey )
            genericFilter[genericFilterKey] = genericFilter[genericFilterKey] + "candidate." + dataKeyString +".tostring() + "}
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
