import React, { useState } from 'react'

export default function Pagination() {
    const [active, setActive] = useState(0)
    function changePage(page){
        if(!isNaN(page)){
            console.log(page)
            setActive(page)
        }

    }
    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const buttonElements = arr.map(button =>{
        return(
            <button key={button} className={`pagination-btn btn number${active === button ? ' active' : ''}`} onClick={() => changePage(button)}>{button}</button>
        )
    })
  return (
    <nav className='horizontal-navbar pagination'>
        <button className='pagination-btn btn' onClick={() => changePage('Start')}>Start</button>
        <button className='pagination-btn btn' onClick={() => changePage('Previous')}>Previous</button>
        {buttonElements}
        <button className='pagination-btn btn' onClick={() => changePage('Next')}>Next</button>
        <button className='pagination-btn btn' onClick={() => changePage('End')}>End</button>
    </nav>
  )
}
