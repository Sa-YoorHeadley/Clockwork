import React, { useState } from 'react'

export default function Pagination({ currentPage, setCurrentPage, paginationData }) {
    function changePage(page){
        if(!isNaN(page) && page > 0){
            setCurrentPage(page)
        }

    }
    const buttonArray = paginationData.pageArray || [1]
    const buttonElements = buttonArray.map(button =>{
        if(button < 1) return
        return(
            <button key={button} className={`pagination-btn btn number${currentPage === button ? ' active' : ''}`} onClick={() => changePage(button)}>{button}</button>
        )
    })
  return (
    <nav className='horizontal-navbar pagination'>
        <button className='pagination-btn btn' onClick={() => changePage(1)}>Start</button>
        <button className='pagination-btn btn' disabled={paginationData.previousPage ? false : true} onClick={() => changePage(currentPage - 1)}>Previous</button>
        {buttonElements}
        <button className='pagination-btn btn' disabled={paginationData.nextPage ? false : true} onClick={() => changePage(currentPage + 1)}>Next</button>
        <button className='pagination-btn btn' onClick={() => changePage(paginationData.totalPages)}>End</button>
    </nav>
  )
}
