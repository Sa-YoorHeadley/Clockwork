import React from 'react'

export default function Card({PersonID, firstName, lastName, currentStatus, city, state, emailAddress, onEdit, onDelete, onSchedule}) {
    return (
        <article className='card'>
            <small className='id'>{PersonID}</small>
            <div className='personal-information'>
                <header className='card-header'>
                    <h1 className='name'>{firstName} {lastName}</h1>  
                </header>
                    <h4 className='currentStatus'>Current Status: {currentStatus}</h4>
                    <h4 className='name'>Location: {city} {state}</h4>  
                    <h4 className='emailAddress'>Email Address: {emailAddress}</h4>
            </div>
            <div className='buttons'>
                {/* {true ? <button className='btn schedule' onClick={onSchedule}>Contact</button> : <button className='btn reschedule' onClick={onSchedule}>Reschedule</button> } */}
                
                {/* <button className='btn edit' onClick={onEdit}>Edit</button> */}
                <button className='btn delete' onClick={onDelete}>Delete</button>
            </div>
        </article>
    )
}
