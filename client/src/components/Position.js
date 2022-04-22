import Axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Position({ locationOptions }) {
  const [optionElements, setOptionElements] = useState([]) 
  const [newPosition, setNewPosition] = useState({ 
    "city": '',
    "state": '',
    "position": '',
    "manager": '',
    "managerEmail": '',
    "idLocations": '',
  })
  
  useEffect(() => {
    getOptionElements()
  }, [locationOptions])

  function setValues(selectedLocation){
    if(locationOptions.length !== 0) {
      if(!selectedLocation) return
      const locationElement = locationOptions.find(location => location.idLocations === parseInt(selectedLocation))
      setNewPosition(prevPosition => {
        return{
          ...prevPosition,
          city: locationElement.city,
          state: locationElement.state
        }
      })
    }
  }

  async function getOptionElements(){
    await setOptionElements (locationOptions.map((option, index) => {
      if(index === 0) setValues(option.idLocations)
        return(
          <option key={option.name} value={option.idLocations}>{option.name}</option>
        )
    }))
  }


  function closeContactForm(){
    // openNewPositionForm(false)
  }

  function handleChange(event){
    const { name, value } = event.target

    if(name === 'idLocations'){
      setValues(value)
    }
    
    setNewPosition(prevPositionData => {
        return{
          ...prevPositionData,
          [name]: value
        }
      }
    )
  }

  async function submitForm(){
    const blank = element => !element
    let values = Object.values(newPosition)
    
    if(values.some(blank)){
      return
    }

    await Axios.post('http://localhost:3001/position/create', {newPosition}).then(() => alert("Position Created"))
    
    closeContactForm()
    
    return
  
  }




  return (
    <div className='contact-form'>
      <div className='contact-form-main'>
        <button className='btn close' onClick={closeContactForm}>X</button>
        <h2 className='contact-form-header'>New Position</h2>

        <div className='contact-form-body'>
          
          <label htmlFor='idLocations'>Location ID</label>
          <select required type='text' name='idLocations' id='idLocations' value={newPosition.idLocations} onChange={handleChange}>
            {optionElements}
          </select>

          <label htmlFor='city'>City</label>
          <input required type='text' name='city' id='city' value={newPosition.city} onChange={handleChange}/>
          
          <label htmlFor='state'>State</label>
          <input required type='text' name='state' id='state' value={newPosition.state} onChange={handleChange}/>
          
          <label htmlFor='position'>Position</label>
          <input required type='text' name='position' id='position' value={newPosition.position} onChange={handleChange}/>

          <label htmlFor='manager'>Manager</label>
          <input required type='text' name='manager' id='manager'/>

          <label htmlFor='managerEmail'>Manager's Email</label>
          <input required type='email' name='managerEmail' id='managerEmail' value={newPosition.managerEmail} onChange={handleChange}/>

          
          
          <button className='btn submit' onClick={submitForm}>Submit</button>
        </div>

      </div>
    </div>
  )
}
