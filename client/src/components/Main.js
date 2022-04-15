import React from 'react'
import ApplicationCard from './ApplicationCard'
import Card from './Card'
import Detail from './Detail'
import DetailHeader from './DetailHeader'
import Pagination from './Pagination'
import Ribbon from './Ribbon'

export default function Main({ listType, listData, deleteCandidate, updateCandidate, scheduleCandidate, contactCandidate, setSearchKey, setSearchOption, listStatus }) {
    let cardElements
    let applicationCardElements
    let detailElements = [<DetailHeader key='header'/>]
    const keys = !Object.keys(listData).length  ? ['Loading...'] : Object.keys(listData[0])
    if(listType === 'readCandidates' && listData){
        cardElements = listData.map(employee =>{
            return(
                <Card
                key={employee.PersonID}
                onEdit={() => updateCandidate(employee.PersonID)}
                onDelete={() => deleteCandidate(employee.PersonID)}
                {...employee}
                />
            )
        })
    }
    else if(listType === 'readContacts' && listData){
        detailElements.push(listData.map(contact => {
            return(
                <>
                <Detail key={contact.idContacts} {...contact} />
                </>
                )
            })
        )
    }
    else if(listType === 'readApplications' && listData){
        applicationCardElements = listData.map(application => {
            return(
                <ApplicationCard key={application.idApplications} {...application} onContact={() => contactCandidate(application.idApplications)} />
            )
        })
        
    }
    return (
        <main className='main'>
            <Ribbon setSearchKey={setSearchKey} setSearchOption={setSearchOption} dataKeys={keys} listType={listType} listStatus={listStatus} />
            {listType === 'readContacts' ?
                <div className='table-container'>
                    <div className='detail-container'>
                        {detailElements}
                    </div>
                </div>
            :
            <div className='card-container'>
                {listType === 'readCandidates' ? cardElements : listType === 'readApplications' ? applicationCardElements : null}
            </div>
            }       
            <Pagination />
        </main>
    )
}
