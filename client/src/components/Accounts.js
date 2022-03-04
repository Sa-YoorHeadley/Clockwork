import React from 'react'

export default function Accounts({changeDatabase}) {
  function handleChange(event){
    
    const database = event.target.value
    changeDatabase(database)
  }

    return (
        <div className='accounts'>
            <h1 className='accounts-header'>Select Database</h1>
            <select onChange={handleChange} className='accounts-select'>
                <option value = "default"></option>
                <option value = "jeffersonHealthDb">Jefferson Health</option>
                <option value = "optumDb">Optum</option>
                <option value = "paychexDb">Paychex</option>
            </select>
        </div>
  )
}
