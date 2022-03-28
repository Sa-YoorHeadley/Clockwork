import React, { useState, useEffect } from 'react'

export default function Scheduler({ targetCandidate, openScheduler }) {
  
  const [formData, setFormData] = useState(targetCandidate)

  function closeScheduler(){
    console.log('close')
    openScheduler(false)
  }

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

    if(values.some(blank)){
        console.log('blank values')
        return
    } 
    else{
      closeScheduler()
    }      
  }




  return (
    <div className='scheduler'>
      <div className='scheduler-main'>
        <button className='btn close' onClick={closeScheduler}>X</button>
        <h2 className='scheduler-header'>Schedule Candidate</h2>

        <div className='scheduler-body'>
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
