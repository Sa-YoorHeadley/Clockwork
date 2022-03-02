import React from 'react'

export default function Card({id, firstName, lastName, position, age, country, wage, onEdit, onDelete}) {
    return (
        <article className='card'>
            <small className='id'>{id}</small>
            <div className='personal-information'>
                <header className='header'>
                    <h1 className='name'>{firstName} {lastName}</h1> -    
                    <h3 className='position'>{position}</h3>   
                </header>
                    <h4 className='age'>Age: {age}</h4>
                    <h4 className='country'>Country: {country}</h4>
                    <h4 className='wage'>Wage: ${wage}</h4>
            </div>
            <div className='buttons'>
                <button className='btn edit' onClick={onEdit}>Edit</button>
                <button className='btn delete' onClick={onDelete}>Delete</button>
            </div>
        </article>
    )
}
