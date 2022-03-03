import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from 'react'

function App() {
  const data  = JSON.parse(localStorage.getItem("employees")) || []
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState(true)
  const [employeeData, setEmployeeData] = useState(data)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employeeData))
  }, [employeeData])
  

  function updateEmployee(employeeId, sourceEmployee){
    if(!sourceEmployee){
      setFormType('update')
    }
    else{
      sourceEmployee = {
        ...sourceEmployee,
        id: selectedId
      }

      setEmployeeData(oldEmployeeData => {
        const targetEmployee = employeeData.find( employee => employee.id === employeeId)
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
    console.log(employeeId)
    setEmployeeData(oldEmployeeData => {
      const targetEmployee = employeeData.find( employee => employee.id === employeeId)
      if(targetEmployee.scheduled){
        console.log('Rescheduled Employee')
      }else{
        console.log('Schedule Employee')
        targetEmployee.scheduled = true
      }
      return [...oldEmployeeData] 
    })
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
      <aside className="left-section">
        <Navbar handleClick={changeForm}/>
        <Form formType={formType} handleAdd={addEmployee} handleDelete={deleteEmployee} handleUpdate={updateEmployee} selectedId={selectedId}/>
      </aside>
      {showList && <Main employeeData={employeeData} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee} scheduleEmployee={scheduleEmployee}/> }
      
    </div>
  );
}

export default App;
