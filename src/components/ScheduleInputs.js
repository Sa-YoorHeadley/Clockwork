import React, { useState } from 'react'

export default function ScheduleInputs() {
    const [scheduleData, setScheduleData] = useState({date: '', time: '', message:''})
    const unavailableDates = [{date: '2022-01-01', time: '02:00'}, ] 
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
  return (
    <div className='schedule-inputs'>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' name='date' value={scheduleData.date} onChange={handleChangeSchedule}/>

        <label htmlFor='time'>Time</label>
        <input type='time' id='time' name='time' value={scheduleData.time} onChange={handleChangeSchedule}/>
        {scheduleData.message !== '' && <small>{scheduleData.message}</small>}
    </div>
  )
}
