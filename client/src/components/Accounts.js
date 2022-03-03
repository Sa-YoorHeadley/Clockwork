import React from 'react'

export default function Accounts({changeDatabase}) {
  function handleChange(event){
    console.log(event.target)

  }
    return (
    <select onChange={handleChange}>
        <option value = "Jefferson Health">Jefferson Health</option>
        <option value = "Optum">Optum</option>
    </select>
  )
}
