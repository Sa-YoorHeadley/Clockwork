import Axios from 'axios'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/dark.css"

export default function Contact({ changeModal, data, LoggedInRecruiter, showModal }) {
  const {PersonID, firstName, lastName, OpeningId, idApplications} = data
  
  let formPopulation = {
    notes: '',
    contactStatus: 'Submitted',
    idApplications: idApplications
  }
  let formState = {...formPopulation, ...LoggedInRecruiter[0]}
  const [formData, setFormData] = useState({})
  const [scheduleData, setScheduleData] = useState({dateValue: '', date: '', time: '', messages:[]})
  const [defaultValue, setDefaultValue] = useState(new Date())
  
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

  function handleChangeSchedule(dateValue, dateString){
    const [selectedDate, selectedTime] = dateString.split('  ')
    
    setScheduleData(prevScheduleData => {
      return{
        ...prevScheduleData,
        dateValue: dateValue[0],
        date: selectedDate,
        time: selectedTime
      }
    })
  }
    
  function checkAvailability(){
    // const dateCheck = unavailableDates.find(unavailableDate => unavailableDate.date === scheduleData.date && unavailableDate.time === scheduleData.time )
    
    if(scheduleData.dateValue.getMinutes() !== 0 && scheduleData.dateValue.getMinutes() !== 30){
      setScheduleData(prevScheduleData => {
        const error = 'Minutes must be 0 or 30'
        const newMessages = [...prevScheduleData.messages]
        const duplicateMessage = newMessages.find(message => message.includes(error))
        if(!duplicateMessage){
          newMessages.push(error)
          return{
              ...prevScheduleData,
              messages: newMessages
          }
        }
        else{
          return{...prevScheduleData}
        }

      })
    } 
    else {
      setScheduleData(prevScheduleData => {
        return{
            ...prevScheduleData,
            messages: []
        }
      })
    }

    return scheduleData.messages
  }

  async function submitForm(){
    let id = idApplications
    const messages = checkAvailability()
    if(messages.length !== 0) return
    
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
          <>
            <label htmlFor='date-time'>Date</label>
            <Flatpickr
              placeholder='Please select date and time...'
              id='date-time'
              value={scheduleData.dateValue} 
              options={{
                enableTime: true,
                position: 'auto center',
                minDate: new Date(),
                minTime: "8:00",
                maxTime: "17:00",
                dateFormat: 'd-m-Y  h:i K',
                disable: [
                  function(date) {
                    // return true to disable
                    return (date.getDay() === 0 || date.getDay() === 6);
                  }
                ],
                minuteIncrement : 30
              }}
              onChange={(date, dateString) => handleChangeSchedule(date, dateString)}
            />
            {scheduleData.messages.length !== 0 &&
              <div className='error-list'>
                {scheduleData.messages.map(message => { 
                  return(<small key={message}>{message}</small>)
                })}
              </div>
            
            }
          </>
          }

          <button className='btn submit' onClick={submitForm}>Submit</button>
        </div>

      </div>
    </div>
  )
}
