import React from 'react'

export default function Accounts({changeDatabase}) {
  function handleChange(event){
    
    const database = event.target.value
    changeDatabase(database)
  }

    return (
    <select onChange={handleChange}>
        <option value = "default"></option>
        <option value = "jeffersonHealthDb">Jefferson Health</option>
        <option value = "optumDb">Optum</option>
        <option value = "paychexDb">Paychex</option>
    </select>
  )
}
