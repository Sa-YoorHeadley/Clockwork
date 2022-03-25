import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Scheduler from "./components/Scheduler";
import LandingPage from "./components/LandingPage";
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

//Add function to get employee data and every time employee is added we call it

function App() {
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState(true)
  const [selectedDatabase, setSelectedDatabase] = useState('default')
  const [selectedId, setSelectedId] = useState('')
  const [openScheduler, setOpenScheduler] = useState(false)
  const [targetEmployee, setTargetEmployee] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)
  const [employeeData, setEmployeeData] = useState([])
  
  useEffect(() => {
    getEmployeeData()
  }, [])

  function getEmployeeData(){
    Axios.get('http://localhost:3001/candidates')
    .then(res => {
      setEmployeeData(res.data)
    })
  }

  
  function addEmployee(newEmployee){
    Axios.post('http://localhost:3001/create', {newEmployee}).then(() => alert("Employee Created"))
    getEmployeeData()
  }

  function updateEmployee(employeeId, updatedEmployee){
    if(!updatedEmployee){
      setSelectedId(employeeId)
      setFormType('update')
      return
    }
    Axios.put(`http://localhost:3001/update/${employeeId}`, {updatedEmployee}).then(() => alert("Employee Updated"))
    getEmployeeData()
  }

  function deleteEmployee(employeeId){
    Axios.delete(`http://localhost:3001/delete/${employeeId}`).then(() => alert("Employee Deleted"))
    getEmployeeData()
  }
  
  function randomFunction(){}
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
          <Form formType={formType} handleDelete={deleteEmployee} handleUpdate={updateEmployee} handleAdd={addEmployee} selectedId={selectedId} selectedDatabase={selectedDatabase}/>
          </aside>
          {showList && <Main employeeData={employeeData} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee} /> }
          {openScheduler && <Scheduler targetEmployee={targetEmployee} openScheduler={setOpenScheduler} setTargetEmployee={setTargetEmployee} />}
        </>
      }
    </div>
  );
}

export default App;
