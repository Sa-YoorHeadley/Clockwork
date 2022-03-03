import React from 'react'
import Card from './Card'

export default function Main({ employeeData, deleteEmployee, updateEmployee, scheduleEmployee }) {
    

    const cardElements = employeeData.map(employee =>{
        return(
            <Card
            key={employee.id}
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
