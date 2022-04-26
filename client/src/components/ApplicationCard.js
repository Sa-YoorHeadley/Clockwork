import React from 'react'

export default function ApplicationCard({firstName, lastName, position, phoneNumber, PersonID, onContact}) {
    return (
        <article className='card'>
            <small className='id'>{PersonID}</small>
            <div className='personal-information'>
                <header className='card-header'>
                    <h1 className='name'>{firstName} {lastName}</h1>  
                </header>
                    <h4 className='position'>Position: {position}</h4>
                    <h4 className='phoneNumber'>Phone Number: {phoneNumber}</h4>
            </div>
            <div className='buttons'>
                <button className='btn schedule' onClick={onContact}>Contact</button>
            </div>
        </article>
    )
}
