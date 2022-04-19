import React from 'react'
import SearchBar from './SearchBar'
export default function Ribbon({setSearchKey, setSearchOption, setResultLimit, dataKeys, listType, listStatus}) {
  function changeLimit(event){
    setResultLimit(event.target.value)
  }
  return (
    <nav className="horizontal-navbar">
        <SearchBar setSearchKey={setSearchKey} setSearchOption={setSearchOption} dataKeys={dataKeys} listType={listType} listStatus={listStatus} setResultLimit={setResultLimit}/>
        
        <div className='limit function'>
          <h5 className='function-title'>Limit Results</h5>
          <select className='limit-select' defaultValue={50} onChange={changeLimit}>
                <option value={10} >10</option>
                <option value={15} >15</option>
                <option value={30} >30</option>
                <option value={50} >50</option>
                <option value={100} >100</option>
                <option value={200} >200</option>
          </select>
        </div>
    </nav>
  )
}
