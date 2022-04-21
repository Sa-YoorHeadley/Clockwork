import Axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Scheduler({ targetCandidate, openContactForm, data, LoggedInRecruiter}) {
  const {PersonID, firstName, lastName,OpeningId,idApplications} = data[0]
  console.log(idApplications)
  let formPopulation = {
    notes: '',
    contactStatus: '',
    idApplications
  }
  let formState = {...formPopulation,...LoggedInRecruiter[0]}
  const [formData, setFormData] = useState(formState)
 

  function closeContactForm(){
    openContactForm(false)
  }

  function handleChange(event){
    const { name, value } = event.target
    
    setFormData(prevFormData => {
        return{
          ...prevFormData,
          [name]: value
        }
      }
    )
  }

  function submitForm(){
    const blank = element => !element
    let values = Object.values(formData)
    let id = formData.idApplications
    
    console.log(`this is formdata` +JSON.stringify(formData))
    
    //if(!values.some(blank)){
     {
      Axios.put(`http://localhost:3001/application/update/${id}`,{formData}).then(function(response) {
        console.log(response.data);
     }).catch(function(error) {
        console.log(error.response.data);
     });
      Axios.post('http://localhost:3001/contact/create', {formData}).then(() => alert("Contact Created"))
      closeContactForm()
      
      return
    }    
  }




  return (
    <div className='contact-form'>
      <div className='contact-form-main'>
        <button className='btn close' onClick={closeContactForm}>X</button>
        <h2 className='contact-form-header'>Contact Form</h2>

        <div className='contact-form-body'>
          
          <label htmlFor='employeeId'>Candidate ID</label>
          <input type='text' id='employeeId' value={PersonID} readOnly/>
          
          <label htmlFor='employeeName'>Candidate Name</label>
          <input type='text' id='employeeName' value={`${firstName} ${lastName}`}readOnly/>

          <label htmlFor='notes'>Notes</label>
          <textarea name='notes' id='notes' onChange={handleChange}/>

          <label htmlFor='contactStatus'>Contact Outcome Status</label>
          <input type='text' name='contactStatus' id='contactStatus' onChange={handleChange} />
          

          <button className='btn submit' onClick={submitForm}>Submit</button>
        </div>

      </div>
    </div>
  )
}
