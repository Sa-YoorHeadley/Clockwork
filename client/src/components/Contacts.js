import Axios from 'axios'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import ScheduleInputs from './ScheduleInputs'

export default function Contact({ changeModal, data, LoggedInRecruiter, showModal }) {
  const {PersonID, firstName, lastName, OpeningId, idApplications} = data
  
  let formPopulation = {
    notes: '',
    contactStatus: '',
    idApplications: idApplications
  }
  let formState = {...formPopulation, ...LoggedInRecruiter[0]}
  const [formData, setFormData] = useState({})

  const [scheduleData, setScheduleData] = useState({date: '', time: '', message:''})
  const unavailableDates = [{date: '2022-01-01', time: '02:00'}, ] 
  
  useEffect(() => {
    setFormData(formState)
  }, [data])

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

  function handleChangeSchedule(event){
    const {name, value} = event.target
    
    setScheduleData(prevScheduleData => {
        return{
            ...prevScheduleData,
            [name] : value
        }
    })
  }

  function checkAvailability(){
    const dateTime = new Date(`${scheduleData.date} ${scheduleData.time}`)

    const dateCheck = unavailableDates.find(unavailableDate => unavailableDate.date === scheduleData.date && unavailableDate.time === scheduleData.time )
    
    if(dateCheck || dateTime.getDay() === 6 || dateTime.getDay() === 0 || dateTime.getHours() < 8 || dateTime.getHours() > 17){
        setScheduleData(prevScheduleData => {
            return{
                ...prevScheduleData,
                message : 'Date Unavailable'
            }
        })
    }
    else{
        setScheduleData(prevScheduleData => {
            return{
                ...prevScheduleData,
                message : ''
            }
        })
    }
    return scheduleData.message
  }

  async function submitForm(){
    let id = idApplications
    const message = checkAvailability()
    if(message !== '') return
    
    //if(!values.some(blank)){
     {
      await Axios.put(`http://localhost:3001/application/update/${id}`,{formData}).then(function(response) {
     }).catch(function(error) {
        console.log(error.response.data);
     });
      await Axios.post('http://localhost:3001/contact/create', {formData}).then(() => alert("Contact Created"))
      changeModal('')
      
      return
    }    
  }

  //Available Days and times for days



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
          </select>
          
          {formData.contactStatus === 'Submitted' &&
            <div className='schedule-inputs'>
              <label htmlFor='date'>Date</label>
              <input type='date' id='date' name='date' value={scheduleData.date} onChange={handleChangeSchedule}/>
      
              <label htmlFor='time'>Time</label>
              <input type='time' id='time' name='time' value={scheduleData.time} onChange={handleChangeSchedule}/>
              {scheduleData.message !== '' && <small>{scheduleData.message}</small>}
            </div>
          }

          <button className='btn submit' onClick={submitForm}>Submit</button>
        </div>

      </div>
    </div>
  )
}
