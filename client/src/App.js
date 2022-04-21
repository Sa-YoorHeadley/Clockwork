import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Scheduler from "./components/Scheduler";
import Contacts from "./components/Contacts"
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

//Add function to get employee data and every time employee is added we call it
//Candidate Contact List New Candidate and Contact
function App() {
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState({listName: 'readCandidates', status: true})
  const [listStatus, setListStatus] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState('default')
  const [selectedId, setSelectedId] = useState('')
  const [openScheduler, setOpenScheduler] = useState(false)
  const [targetCandidate, setTargetCandidate] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)
  const [data, setData] = useState([])
  const [openContactForm, setOpenContactForm] = useState({data:{}, status:false})
  const [paginationData, setPaginationData] = useState({})
  const [filterOptions, setFilterOptions] = useState({filterKey: '', filterBy: 'ID'})
  const [resultLimit, setResultLimit] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredList, setFilteredList] = useState([])
  const [LoggedInRecruiter, setLoggedInRecruiter] = useState({})
  
  useEffect(() => {
    setFilterOptions({filterKey: '', filterBy: 'ID'})
    setData([])
    getData()
  }, [currentPage, resultLimit, showList])

  useEffect(() => {
    setCurrentPage(1)
  }, [showList.listName])
   
  useEffect(() => {
    filterList()
  }, [filterOptions.filterKey, filterOptions.filterBy])

  useEffect(() => {
    getPaginationData()
  }, [currentPage, resultLimit, showList.listName])

  useEffect(() => {
    setListStatus(prevListStatus => !prevListStatus)
    
  }, [showList.status, showList.listName])

  async function getData(){
    let route 
    if(showList.listName === 'readCandidates') route = 'candidates'
    if(showList.listName === 'readContacts') route = 'contacts'
    if(showList.listName === 'readApplications') route = 'applications'
    await Axios.get(`http://localhost:3001/${route}?page=${currentPage}&limit=${resultLimit}`)
    .then(res => {
      setData(res.data.data)
    })
  }
  
function checkRecruiterLogin(recruiterEmail, attempt){
  console.log(`${recruiterEmail} ------- ${attempt}`)
  Axios.get(`http://localhost:3001/recruiters/${recruiterEmail}`)
  .then(res => {
    console.log(res)
    let credentials = res.data[0].loginCredentials
    let isSuccessful  = (credentials === attempt && credentials !== undefined)? true:false
    console.log(`${credentials} ------- ${attempt}`)
    setLoggedInRecruiter(res.data)
    setLoggedIn(isSuccessful)
    
    console.log(LoggedInRecruiter)
  })
}

  async function getPaginationData(){
    let route 
    if(showList.listName === 'readCandidates') route = 'candidates'
    if(showList.listName === 'readContacts') route = 'contacts'
    if(showList.listName === 'readApplications') route = 'applications'
    await Axios.get(`http://localhost:3001/${route}?page=${currentPage}&limit=${resultLimit}`)
    .then(res => {
      setPaginationData(res.data.paginationData)
    })
  }
  
  function filterList(){
    setFilteredList(data)
    setFilteredList(prevFiltered => {
        return(
          prevFiltered.filter(application =>{
              //Use Keys to get these values
              let keys = []
              if(filterOptions.filterBy === 'Name'){
                keys = ["firstName", "lastName"]
              }

              else if(filterOptions.filterBy === 'Location'){
                keys = ["city", "state", "streetAddress"]
              }

              else if(filterOptions.filterBy === 'Email'){
                keys = ["emailAddress", "managerEmail"]
              }

              else if(filterOptions.filterBy === 'ID'){
                keys = ["idApplications","idOpenings", "idContacts", "PersonID", "OpeningId", "ContactRecruiterId", "ApplicationPersonId", "ContactApplicationsId"]
              }

              else if(filterOptions.filterBy === 'Phone Number'){
                keys = ["phoneNumber"]
              }
              
              else if(filterOptions.filterBy === 'Status'){
                keys = ["currentStatus", "ApplicationStatus", "ContactStatus"]
              }
              
              else if(filterOptions.filterBy === 'Other'){
                keys = ["ContactTimeStamp", "ApplicationDate", "position", "manager"]
              }
              
              return keys.some((key) => {
                if(application[key]){
                  return application[key].toString().toLowerCase().includes(filterOptions.filterKey.toLowerCase())
                } else return
              })

            })
            )  
    })
  
    if(!filterOptions.filterKey){
      setFilteredList(['No Data'])
    }
    
  }
  
  function addCandidate(newCandidate){
    Axios.post('http://localhost:3001/candidate/create', {newCandidate}).then(() => alert("Candidate Created"))
    getData()
  }

  function updateCandidate(employeeId, updatedCandidate){
    if(!updatedCandidate){
      setSelectedId(employeeId)
      setFormType('update')
      return
    }
    Axios.put(`http://localhost:3001/candidate/update/${employeeId}`, {updatedCandidate}).then(() => alert("Candidate Updated"))
    getData()
  }

  function deleteCandidate(employeeId){
    const confirmation = confirm(`You are about to delete Candidate: #${employeeId}`)
    if(confirmation){
      Axios.delete(`http://localhost:3001/candidate/delete/${employeeId}`).then(() => alert("Candidate Deleted"))
    }
    getData()
  }

  function contactCandidate(applicationId){
    setOpenContactForm(true)
    Axios.get(`http://localhost:3001/applications/${applicationId}`).then(res => {
      setOpenContactForm({data: res.data, status: true})
    })
    getData()
  }
  

  function scheduleCandidate(employeeId){
    setTargetCandidate(data.find( employee => employee.id === employeeId))
    if(targetCandidate.scheduled){
      console.log('Rescheduled Candidate')
      setOpenScheduler(true)
    }else{
      console.log('Schedule Candidate')
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
            listName: prevShowList.listName,
            status: !prevShowList.status
        }
      })
      setListStatus("false")
    }
    else{
      setShowList({listName: listName, status: true})
      setListStatus("true")
    }
  }
  return (
    <div className="App">
      { !loggedIn ? 
        <LandingPage setLoggedIn={checkRecruiterLogin}/> :
        <>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <aside className="left-section">
          <Navbar handleClick={changeForm} changeDatabase={setSelectedDatabase} changeList={changeList} listType={showList.listName}/>
          {/* <Form listType={showList.listName} formType={formType} handleDelete={deleteCandidate} handleUpdate={updateCandidate} handleAdd={addCandidate} selectedId={selectedId} selectedDatabase={selectedDatabase}/> */}
          </aside>
          {showList.status && <Main 
            listType={showList.listName}
            listStatus={listStatus}
            listData={filteredList[0] !== 'No Data' ? filteredList : data} 
            currentPage={currentPage}
            paginationData={paginationData}
            filterOptions={filterOptions}
            deleteCandidate={deleteCandidate} 
            updateCandidate={updateCandidate} 
            scheduleCandidate={scheduleCandidate}
            contactCandidate={contactCandidate} 
            setFilterOptions={setFilterOptions}
            setResultLimit={setResultLimit}
            setCurrentPage={setCurrentPage}
            />}
          {openContactForm.status && <Contacts openContactForm={setOpenContactForm} data={openContactForm.data} LoggedInRecruiter={LoggedInRecruiter}/>} 
          {/* {openScheduler && <Scheduler targetCandidate={targetCandidate} openScheduler={setOpenScheduler} setTargetCandidate={setTargetCandidate} />} */}
        </>
      }
    </div>
  );
}

export default App;
