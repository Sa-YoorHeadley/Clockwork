import React from 'react'

export default function DetailHeader() {
  return (
    <header className='detail-header row'>
        <span className='cell'>Candidate ID</span>
        <span className='cell'>First Name</span>
        <span className='cell'>Last Name</span>
        <span className='cell'>Email Address</span>
        <span className='cell'>Phone Number</span>
        <span className='cell'>Contact Time</span>
        <span className='cell'>Contact Status</span>
        <span className='cell'>Recruiter Name</span>
        <span className='cell'>Application ID</span>
    </header>
  )
}
