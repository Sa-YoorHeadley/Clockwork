import Axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Position({}) {
  
  async function getOptions(){
    await Axios.get('http://localhost:3001/openings').then(res => {
       const options = res.data
    })

  }

  const [newPosition, setNewPosition] = useState({ 
    "city": '',
    "state": '',
    "position": '',
    "manager": '',
    "managerEmail": '',
    "idLocations": '',
  })

  function closeContactForm(){
    // openNewPositionForm(false)
  }

  function handleChange(event){
    const { name, value } = event.target
    
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
          <input required type='text' name='idLocations' id='idLocations' value={newPosition.idLocations} onChange={handleChange}/>
          
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
