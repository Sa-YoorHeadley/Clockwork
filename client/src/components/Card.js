import React from 'react'

export default function Card({PersonID, firstName, lastName, currentStatus, city, state, emailAddress, onEdit, onDelete, onSchedule}) {
    return (
        <article className='card'>
            <small className='id'>{PersonID}</small>
            <div className='personal-information'>
                <header className='card-header'>
                    <h1 className='name'>{firstName} {lastName}</h1>  
                </header>
                    <h5 className='currentStatus'>Current Status: {currentStatus}</h5>
                    <h5 className='name'>Location: {city} {state}</h5>  
                    <h5 className='emailAddress'>Email Address: {emailAddress}</h5>
            </div>
            <div className='buttons'>
                {/* {true ? <button className='btn schedule' onClick={onSchedule}>Contact</button> : <button className='btn reschedule' onClick={onSchedule}>Reschedule</button> } */}
                
                {/* <button className='btn edit' onClick={onEdit}>Edit</button> */}
                <button className='btn delete' onClick={onDelete}>Delete</button>
            </div>
        </article>
    )
}
