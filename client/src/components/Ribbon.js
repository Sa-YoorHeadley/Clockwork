import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey, setSearchOption, dataKeys, listType, listStatus}) {
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey} setSearchOption={setSearchOption} dataKeys={dataKeys} listType={listType} listStatus={listStatus}/>
        
        <div className='limit function'>
          <h4 className='function-title'>Record Limit</h4>
          <select className='limit-select'>
                <option value={10} >10</option>
                <option value={15} >15</option>
                <option value={30} >30</option>
                <option value={50} selected>50</option>
                <option value={100} >100</option>
                <option value={200} >200</option>
          </select>
        </div>
    </nav>
  )
}
