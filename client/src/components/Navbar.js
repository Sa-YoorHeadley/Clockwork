import React from 'react'
import Accounts from './Accounts'
export default function Navbar({ handleClick, changeDatabase }) {
    
    return (
        <nav className='navbar'>
            <Accounts changeDatabase={changeDatabase}/>
            
            <button className='btn' onClick={() => handleClick('create')} >New Employee</button>
            <button className='btn' onClick={() => handleClick('update')} disabled>Update Employee</button>
            <button className='btn' onClick={() => handleClick('delete')} disabled>Delete Employee</button>
            <button className='btn' onClick={() => handleClick('read')}>Employee List</button>    
        </nav>
    )
}
