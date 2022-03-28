import React from 'react'
import Accounts from './Accounts'
export default function Navbar({ handleClick, changeDatabase, changeList, listType }) {
    const buttonType = listType === 'readEmployees' ? 'Employee' : listType === 'readContacts' ? 'Contact' : null
    return (
        <nav className='navbar'>
            <Accounts changeDatabase={changeDatabase}/>

            {/* <button className='btn' onClick={() => handleClick('create')} >New Employee</button>
            <button className='btn' onClick={() => handleClick('update')} >Update Employee</button>
            <button className='btn' onClick={() => handleClick('delete')} >Delete Employee</button> */}
            <button className='btn' onClick={() => changeList('readEmployees')} >Employee List</button>  
            <button className='btn' onClick={() => changeList('readContacts')} >Contact List</button> 
            <button className='btn' onClick={() => changeList('readApplications')} >Application List</button> 


            {/* {buttonType && <button className='btn' onClick={() => handleClick('create')} >New {buttonType}</button>}   */}
        </nav>
    )
}
