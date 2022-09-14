import Form from "./components/Form";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Scheduler from "./components/Scheduler";
import Contacts from "./components/Contacts"
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Location from "./components/Location";
import Position from "./components/Position";
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

//Show Please Click List if show list is false, 
// Move login form up and fix hashing
//My queue route ????? based on logged in recruiter ID
//Show Info on candidates
// Last used list
function App() {
  const LOCAL_STORAGE_LAST_LIST = 'clockwork.list'
  const [formType, setFormType] = useState('create')
  const [showList, setShowList] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAST_LIST)) || {listName: 'readCandidates', status: true})
  const [showModal, setShowModal] = useState('')
  const [listStatus, setListStatus] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState('default')
  const [selectedId, setSelectedId] = useState('')
  const [targetCandidate, setTargetCandidate] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [data, setData] = useState([])
  const [contactForm, setContactForm] = useState({})
  const [paginationData, setPaginationData] = useState({})
  const [filterOptions, setFilterOptions] = useState({filterKey: '', filterBy: 'ID'})
  const [resultLimit, setResultLimit] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredList, setFilteredList] = useState([])
  const [locationOptions, setLocationOptions] = useState([])
  const [LoggedInRecruiter, setLoggedInRecruiter] = useState(
    {
        "idRecruiters": 9999,
        "recruiterFirstName": "Daniel",
        "recruiterLastName": "RecruiterLast",
        "email": "Daniel.Rollins@bayardad.com",
        "assignedAccounts": "3213",
        "loginCredentials": "Password"
    })
  
  useEffect(()=>{
    Axios.get('http://localhost:3001/locations').then(res => {
      setLocationOptions(res.data)
    }) 
  }, [])

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
    saveLastUsedList()
    
  }, [showList.status, showList.listName])

  function saveLastUsedList(){
    localStorage.setItem(LOCAL_STORAGE_LAST_LIST, JSON.stringify(showList))
  }
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
  
async function checkRecruiterLogin(recruiterEmail, attempt){
  console.log(`${recruiterEmail} ------- ${attempt}`)
  await Axios.get(`http://localhost:3001/recruiters/${recruiterEmail}`)
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
  
  async function addCandidate(newCandidate){
    await Axios.post('http://localhost:3001/candidate/create', {newCandidate}).then(() => alert("Candidate Created"))
    getData()
  }

  async function updateCandidate(employeeId, updatedCandidate){
    if(!updatedCandidate){
      setSelectedId(employeeId)
      setFormType('update')
      return
    }
    await Axios.put(`http://localhost:3001/candidate/update/${employeeId}`, {updatedCandidate}).then(() => alert("Candidate Updated"))
    getData()
  }

  async function deleteCandidate(employeeId){
    const confirmation = confirm(`You are about to delete Candidate: #${employeeId}`)
    if(confirmation){
      await Axios.delete(`http://localhost:3001/candidate/delete/${employeeId}`).then(() => alert("Candidate Deleted"))
    }
    getData()
  }

  function contactCandidate(applicationId){
    Axios.get(`http://localhost:3001/applications/${applicationId}`).then(res => {
      setContactForm(res.data)
    })
    changeModal('newContact')
  }
  


async function parseCandidate(){

  let newEmployee = {
    firstName:"Chris",
    lastName : "Guy",
    city : "Aurora",
    state : "IL",
    position : "3rd Shift Warehouse Associate - IMMEDIATE HIRE",
    emailAddress:"cguy@gmail.com",
    phoneNumber:9999999
  }
  await Axios.post(`http://localhost:3001/candidate/create`, {newEmployee}).then(res => {
   
    newEmployee.ApplicationPersonId = res.data
    })
   
    var queryString = Object.keys(newEmployee).map(key => key + '=' + newEmployee[key]).join('&');
    queryString = queryString.replace(/ /g,"%20")
    
    await Axios.get(`http://localhost:3001/openings?${queryString}`).then(res => {
      newEmployee.OpeningId = res.data[0].idOpenings
    })
    
    await Axios.post(`http://localhost:3001/application/create`, {newEmployee}).then(res => {
    })
   
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
    }
    else{
       setShowList(true)
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

  function changeModal(modalName){
    setShowModal(prevShowModal => {
      if(prevShowModal === modalName){
        return ''
      }
      return modalName
    })
  }

  return (
    <div className="App">
      { !loggedIn ? 
        <LandingPage setLoggedIn={checkRecruiterLogin}/> :
        <>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <aside className="left-section">
          <Navbar handleClick={changeForm} changeDatabase={setSelectedDatabase} changeList={changeList} listType={showList.listName} parseCandidate={parseCandidate} changeModal={changeModal}/>
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
            getData={getData}
            />}
          {showModal === 'newContact' && <Contacts showModal={showModal} changeModal={changeModal} data={contactForm} LoggedInRecruiter={LoggedInRecruiter}/>} 
          {showModal === 'newPosition' && <Position showModal={showModal} changeModal={changeModal} locationOptions={locationOptions}/>}
          {showModal === 'newLocation' && <Location showModal={showModal} changeModal={changeModal} />}
          {/* {showModak === 'newSchedule' && <Scheduler targetCandidate={targetCandidate} showModal={showModal} changeModal={changeModal} setTargetCandidate={setTargetCandidate} />} */}
        </>
      }
    </div>
  );
}

export default App;
