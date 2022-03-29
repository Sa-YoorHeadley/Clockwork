import React from 'react'

export default function Detail({ PersonID, ContactTimeStamp, ContactStatus, ContactRecruiterId, ContactApplicationsId, firstName, lastName, emailAddress, phoneNumber}) {
  return (
      <>
    <div className='detail'>
        <p className='detail-candidate-id'>{PersonID}</p>
        <p className='detail-contact-first-name'>{firstName}</p>
        <p className='detail-contact-last-name'>{lastName}</p>
        <p className='detail-contact-email'>{emailAddress}</p>
        <p className='detail-contact-phone'>{phoneNumber}</p>
        <p className='detail-contact-time'>{ContactTimeStamp}</p>
        <p className='detail-contact-status'>{ContactStatus}</p>
        <p className='detail-recruiter'>{ContactRecruiterId}</p>
        <p className='detail-application-id'>{ContactApplicationsId}</p>
    </div>
    
    </>

  )
}
