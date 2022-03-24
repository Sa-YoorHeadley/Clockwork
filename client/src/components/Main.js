import React from 'react'
import Card from './Card'

export default function Main({ employeeData, deleteEmployee, updateEmployee, scheduleEmployee }) {
    
    console.log(employeeData)

    const cardElements = employeeData.map(employee =>{
        return(
            <Card
            key={employee.personID}
            onEdit={() => updateEmployee(employee.id)}
            onDelete={() => deleteEmployee(employee.id)}
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
