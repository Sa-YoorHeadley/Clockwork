import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function Scheduler({ targetCandidate, changeModal, showModal }) {
  
  const [formData, setFormData] = useState(targetCandidate)
  const modalRef = useRef
  function closeModal(event){
    if(modalRef.current === event.target){
      changeModal('')
    }
  }

  const keyPress = useCallback(event => {
    if(event.key === 'Escape' && showModal === 'newSchedule'){
      changeModal('')
    }
    if(event.key === 'Enter' && showModal === 'newSchedule'){
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
        'scheduleData': {
          ...prevFormData.scheduleData,
          [name]: value
          }}
        }
    )
  }

  function submitForm(){
    const blank = element => !element
    let values = Object.values(formData.scheduleData)

    if(values.some(blank)){ return } 
      
    closeModal()
    return   
  }




  return (
    <div className='modal-form' ref={modalRef} onClick={closeModal}>
      <div className='modal-main'>
        <button className='btn close' onClick={() => changeModal('')}>X</button>
        <h2 className='modal-header'>Schedule Candidate</h2>

        <div className='modal-body'>
          <label htmlFor='employeeId'>Candidate ID</label>
          <input type='text' id='employeeId' value={targetCandidate.id} readOnly/>
          
          <label htmlFor='employeeName'>Candidate Name</label>
          <input type='text' id='employeeName' value={`${targetCandidate.firstName} ${targetCandidate.lastName}`} readOnly/>

          <label htmlFor='interviewTime'>Interview Time</label>
          <input type='time' name='interviewTime' id='interviewTime'  value={targetCandidate.scheduleData.interviewTime} onChange={handleChange}/>

          <label htmlFor='interviewDate'>Interview Date</label>
          <input type='date' name='interviewDate' id='interviewDate' value={targetCandidate.scheduleData.interviewDate} onChange={handleChange}/>

          <button className='btn submit' onClick={submitForm}>Schedule Candidate</button>
        </div>

      </div>
    </div>
  )
}
