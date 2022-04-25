import Axios from 'axios'
import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function Contact({ changeModal, data, LoggedInRecruiter, showModal }) {
  const {PersonID, firstName, lastName, OpeningId, idApplications} = data
  
  let formPopulation = {
    notes: '',
    contactStatus: '',
    idApplications
  }
  let formState = {...formPopulation,...LoggedInRecruiter[0]}
  const [formData, setFormData] = useState(formState)
 

  const modalRef = useRef()

  function closeModal(event){
    if(modalRef.current === event.target){
      changeModal('')
    }
  }

  const keyPress = useCallback(event => {
    if(event.key === 'Escape' && showModal === 'newContact'){
      changeModal('')
    }
    if(event.key === 'Enter' && showModal === 'newContact'){
      submitForm()
    }
  }, [showModal, changeModal, submitForm])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

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

  async function submitForm(){
    let id = formData.idApplications
    
    //if(!values.some(blank)){
     {
      await Axios.put(`http://localhost:3001/application/update/${id}`,{formData}).then(function(response) {
     }).catch(function(error) {
        console.log(error.response.data);
     });
      await Axios.post('http://localhost:3001/contact/create', {formData}).then(() => alert("Contact Created"))
      closeModal()
      
      return
    }    
  }




  return (
    <div className='modal-form' ref={modalRef} onClick={closeModal}>
      <div className='modal-form-main'>
        <button className='btn close' onClick={() => changeModal('')}>X</button>
        <h2 className='modal-form-header'>Contact Form</h2>

        <div className='modal-form-body'>
          
          <label htmlFor='employeeId'>Candidate ID</label>
          <input type='text' id='employeeId' value={PersonID} readOnly/>
          
          <label htmlFor='employeeName'>Candidate Name</label>
          <input type='text' id='employeeName' value={`${firstName} ${lastName}`} readOnly/>

          <label htmlFor='notes'>Notes</label>
          <textarea name='notes' id='notes' value={formData.notes} onChange={handleChange}/>

          <label htmlFor='contactStatus'>Contact Outcome Status</label>
          <select name='contactStatus' id='contactStatus' value={formData.contactStatus} onChange={handleChange} >
            <option value={'Pending'}>Pending</option>
            <option value={'Called'}>Called</option>
            <option value={'Submitted'}>Submitted</option>
            <option value={'Withdrew'}>Withdrew</option>
            <option value={'Could not Reach'}>Could not Reach</option>
            <option value={'Not Interested'}>Not Interested</option>
            {/* //change to drop down {Pending, Called, Submitted, Withdrew, Could not Reach, Not Interested} */}
          </select>
          

          <button className='btn submit' onClick={submitForm}>Submit</button>
        </div>

      </div>
    </div>
  )
}
