import React from 'react'
import Accounts from './Accounts'
export default function Navbar({ handleClick, changeDatabase, changeList, listType,parseCandidate}) {
    const buttonType = listType === 'readCandidates' ? 'Candidate' : listType === 'readContacts' ? 'Contact' : null
    return (
        <nav className='navbar'>
            <Accounts changeDatabase={changeDatabase}/>

            {/* <button className='btn' onClick={() => handleClick('create')} >New Candidate</button>
            <button className='btn' onClick={() => handleClick('update')} >Update Candidate</button>
            <button className='btn' onClick={() => handleClick('delete')} >Delete Candidate</button> */}
            <button className='btn' onClick={() => changeList('readCandidates')} >Candidate List</button>  
            <button className='btn' onClick={() => changeList('readContacts')} >Contact List</button> 
            <button className='btn' onClick={() => changeList('readApplications')} >Application List</button> 
            <button className='btn' onClick={() => parseCandidate()} >Parse Candidates</button> 
            <button className='btn' onClick={() => console.log('New Location')} >New Location</button> 
            <button className='btn' onClick={() => console.log('New Position')} >New Position</button> 


            {/* {buttonType && <button className='btn' onClick={() => handleClick('create')} >New {buttonType}</button>}   */}
        </nav>
    )
}
