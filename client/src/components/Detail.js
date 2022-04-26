import React from 'react'

export default function Detail({ PersonID, ContactTimeStamp, ContactStatus, recruiterFirstName, ContactApplicationsId, firstName, lastName, emailAddress, phoneNumber}) {
  return (
    <>
      <div className='detail row'>
          <p className='detail-candidate-id cell'>{PersonID}</p>
          <p className='detail-contact-first-name cell'>{firstName}</p>
          <p className='detail-contact-last-name cell'>{lastName}</p>
          <p className='detail-contact-email cell'>{emailAddress}</p>
          <p className='detail-contact-phone cell'>{phoneNumber}</p>
          <p className='detail-contact-time cell'>{`${new Date(ContactTimeStamp).toLocaleDateString('en-US')} ~ ${new Date(ContactTimeStamp).toLocaleTimeString('en-US')}`}</p>
          <p className='detail-contact-status cell'>{ContactStatus}</p>
          <p className='detail-recruiter cell'>{recruiterFirstName}</p>
          <p className='detail-application-id cell'>{ContactApplicationsId}</p>
      </div>
    </>
  )
}
