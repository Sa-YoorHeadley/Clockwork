import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Scheduler from "./components/Scheduler";
import Contacts from "./components/Contacts"
import LandingPage from "./components/LandingPage";
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

//Add function to get employee data and every time employee is added we call it
//Employee Contact List New Employee and Contact
function App() {
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState({listName: '', status: false})
  const [selectedDatabase, setSelectedDatabase] = useState('default')
  const [selectedId, setSelectedId] = useState('')
  const [openScheduler, setOpenScheduler] = useState(false)
  const [targetEmployee, setTargetEmployee] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)
  const [employeeData, setEmployeeData] = useState([])
  const [contactsData, setContactsData] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [openContactForm, setOpenContactForm] = useState({data:{}, status:false})
  
  useEffect(() => {
    getEmployeeData()
    getContactsData()
    getApplicationData()
  }, [])

  function getEmployeeData(){
    Axios.get('http://localhost:3001/candidates')
    .then(res => {
      setEmployeeData(res.data)
    })
  }
  
  function getContactsData(){
    Axios.get('http://localhost:3001/contacts')
    .then(res => {
      setContactsData(res.data)
    })
  }
  function getApplicationData(){
    Axios.get('http://localhost:3001/applications')
    .then(res => {
      setApplicationData(res.data)
    })
  }
  
  function addEmployee(newEmployee){
    Axios.post('http://localhost:3001/candidate/create', {newEmployee}).then(() => alert("Employee Created"))
    getEmployeeData()
  }

  function updateEmployee(employeeId, updatedEmployee){
    if(!updatedEmployee){
      setSelectedId(employeeId)
      setFormType('update')
      return
    }
    Axios.put(`http://localhost:3001/candidate/update/${employeeId}`, {updatedEmployee}).then(() => alert("Employee Updated"))
    getEmployeeData()
  }

  function deleteEmployee(employeeId){
    Axios.delete(`http://localhost:3001/candidate/delete/${employeeId}`).then(() => alert("Employee Deleted"))
    getEmployeeData()
  }

  function contactEmployee(applicationId){
    setOpenContactForm(true)
    Axios.get(`http://localhost:3001/applications/${applicationId}`).then(res => {
      setOpenContactForm({data: res.data, status: true})
    })

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
    if(formType !== 'read' || formType !== 'readContacts'){
      setFormType(formType)
      console.log(formType)
    }
    else{
       setShowList(true)
       console.log(formType)
    }
  }
  function changeList(listName){
    if(listName === showList.listName){
      setShowList(prevShowList => {
        return{
            listName: '',
            status: !prevShowList.status
        }
      })
    }
    else{
      setShowList({listName: listName, status: true})
    }
  }

  return (
    <div className="App">
      { !loggedIn ? 
        <LandingPage setLoggedIn={setLoggedIn}/> :
        <>
          <aside className="left-section">
          <Navbar handleClick={changeForm} changeDatabase={setSelectedDatabase} changeList={changeList} listType={showList.listName}/>
          {/* <Form listType={showList.listName} formType={formType} handleDelete={deleteEmployee} handleUpdate={updateEmployee} handleAdd={addEmployee} selectedId={selectedId} selectedDatabase={selectedDatabase}/> */}
          </aside>
          {showList && <Main 
            listType={showList.listName}
            listData={showList.listName === "readCandidates" ? employeeData : showList.listName === "readContacts" ? contactsData : showList.listName === "readApplications" ? applicationData : null} 
            deleteEmployee={deleteEmployee} 
            updateEmployee={updateEmployee} 
            scheduleEmployee={scheduleEmployee}
            contactEmployee={contactEmployee} 
          /> }
          {openContactForm.status && <Contacts openContactForm={setOpenContactForm} data={openContactForm.data}/>} 
          {/* {openScheduler && <Scheduler targetEmployee={targetEmployee} openScheduler={setOpenScheduler} setTargetEmployee={setTargetEmployee} />} */}
        </>
      }
    </div>
  );
}

export default App;
