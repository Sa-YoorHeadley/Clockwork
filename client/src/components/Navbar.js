import React from 'react'
import Accounts from './Accounts'
export default function Navbar({ handleClick }) {
    
    return (
        <nav className='navbar'>
            <Accounts />
            <button className='btn' onClick={() => handleClick('create')}>New Employee</button>
            <button className='btn' onClick={() => handleClick('update')}>Update Employee</button>
            <button className='btn' onClick={() => handleClick('delete')}>Delete Employee</button>
            <button className='btn' onClick={() => handleClick('read')}>Employee List</button>    
        </nav>
    )
}
