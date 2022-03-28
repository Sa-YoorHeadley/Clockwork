import React from 'react'
import ApplicationCard from './ApplicationCard'
import Card from './Card'
import Detail from './Detail'
import DetailHeader from './DetailHeader'

export default function Main({ listType, listData, deleteEmployee, updateEmployee, scheduleEmployee, contactEmployee }) {
    let cardElements
    let applicationCardElements
    let detailElements = [<DetailHeader key='header'/>]
    if(listType === 'readCandidates' && listData){
        cardElements = listData.map(employee =>{
            return(
                <Card
                key={employee.PersonID}
                onEdit={() => updateEmployee(employee.PersonID)}
                onDelete={() => deleteEmployee(employee.PersonID)}
                {...employee}
                />
            )
        })
    }
    else if(listType === 'readContacts' && listData){
        detailElements.push(listData.map(contact => {
            return(
                <Detail key={contact.idContacts} {...contact} />
                )
            })
        )
    }
    else if(listType === 'readApplications' && listData){
        applicationCardElements = listData.map(application => {
            return(
                <ApplicationCard key={application.idApplications} {...application} onContact={() => contactEmployee(application.idApplications)} />
            )
        })
        
    }

    return (
        <main className='main'>
            {listType === 'readCandidates' ? cardElements : listType === 'readContacts' ? detailElements : listType === 'readApplications' ? applicationCardElements : null}
        </main>
    )
}
