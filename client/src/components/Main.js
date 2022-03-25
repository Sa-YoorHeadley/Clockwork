import React from 'react'
import Card from './Card'

export default function Main({ employeeData, deleteEmployee, updateEmployee, scheduleEmployee }) {
    const cardElements = employeeData.map(employee =>{
        return(
            <Card
            key={employee.PersonID}
            onEdit={() => updateEmployee(employee.PersonID)}
            onDelete={() => deleteEmployee(employee.PersonID)}
            onSchedule={() => scheduleEmployee(employee.id)}
            {...employee}
            />
        )
    })

    return (
        <main className='main'>
            {cardElements}
        </main>
    )
}
