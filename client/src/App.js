import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Scheduler from "./components/Scheduler";
import LandingPage from "./components/LandingPage";
import React, { useState, useEffect } from 'react'

function App() {
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState(true)
  const [selectedDatabase, setSelectedDatabase] = useState('default')
  const [selectedId, setSelectedId] = useState('')
  const [openScheduler, setOpenScheduler] = useState(false)
  const [targetEmployee, setTargetEmployee] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  //add entry page
  
  let data  = JSON.parse(localStorage.getItem(selectedDatabase)) || []
  const [employeeData, setEmployeeData] = useState(data)
  
  useEffect(() => {
    localStorage.setItem(selectedDatabase, JSON.stringify(employeeData))
  }, [employeeData])
  
  useEffect(() => {
    console.log(selectedDatabase)
    console.log(data)
    if (selectedDatabase == "default"){
      data = []
    }
    setEmployeeData(data)
    
  }, [selectedDatabase])
  
  function updateEmployee(employeeId, sourceEmployee){
    console.log(`Source: ${JSON.stringify(sourceEmployee)}`)
    console.log(`Target: ${JSON.stringify(targetEmployee)}`)
    if(!sourceEmployee){
      setFormType('update')
    }
    else{
      sourceEmployee = {
        ...sourceEmployee,
        id: selectedId
      }

      setEmployeeData(oldEmployeeData => {
        setTargetEmployee(employeeData.find( employee => employee.id === employeeId))
        Object.assign(targetEmployee, sourceEmployee)
        return [...oldEmployeeData] 
      })
    }
    setSelectedId(employeeId)
  }


  function addEmployee(newEmployee){
    newEmployee.id = 'JEFF-' + Math.floor(Math.random()*90000);
    setEmployeeData(prevEmployeeData =>{return[...prevEmployeeData, newEmployee]})
  }

  function deleteEmployee(employeeId){
    setEmployeeData(oldEmployeeData => oldEmployeeData.filter(employee => employee.id !== employeeId))
  }
  
  function scheduleEmployee(employeeId){
    setTargetEmployee(employeeData.find( employee => employee.id === employeeId))
    if(targetEmployee.scheduled){
      console.log('Rescheduled Employee')
      setOpenScheduler(true)
    }else{
      console.log('Schedule Employee')
      setOpenScheduler(true)
    }
  }

  function changeForm(formType){
    if(formType !== 'read'){
      setFormType(formType)
    }
    else{
       setShowList(prevShowList => !prevShowList)
    }
  }

  return (
    <div className="App">
      { !loggedIn ? 
        <LandingPage setLoggedIn={setLoggedIn}/> :
        <>
          <aside className="left-section">
          <Navbar handleClick={changeForm} changeDatabase={setSelectedDatabase}/>
          <Form formType={formType} handleAdd={addEmployee} handleDelete={deleteEmployee} handleUpdate={updateEmployee} selectedId={selectedId} selectedDatabase={selectedDatabase}/>
          </aside>
          {showList && <Main employeeData={employeeData} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee} scheduleEmployee={scheduleEmployee}/> }
          {openScheduler && <Scheduler targetEmployee={targetEmployee} openScheduler={setOpenScheduler} setTargetEmployee={setTargetEmployee} />}
        </>
      }
    </div>
  );
}

export default App;
