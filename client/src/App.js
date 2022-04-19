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
  const [searchKey, setSearchKey] = useState('')
  const [searchOption, setSearchOption] = useState('ID')
  const [resultLimit, setResultLimit] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredList, setFilteredList] = useState([])
  
  useEffect(() => {
    setData([])
    getData()
  }, [currentPage, resultLimit, showList])

  useEffect(() => {
    setCurrentPage(1)
  }, [showList.listName])
   
  useEffect(() => {
    console.log(searchKey)
    console.log(searchOption)
    filterList(showList.listName)
  }, [searchKey, searchOption])

  useEffect(() => {
    getPaginationData()
  }, [currentPage, resultLimit, showList.listName])

  useEffect(() => {
    setListStatus(prevListStatus => !prevListStatus)
    
  }, [showList.status, showList.listName])

  function getData(){
    let route 
    if(showList.listName === 'readCandidates') route = 'candidates'
    if(showList.listName === 'readContacts') route = 'contacts'
    if(showList.listName === 'readApplications') route = 'applications'
    Axios.get(`http://localhost:3001/${route}?page=${currentPage}&limit=${resultLimit}`)
    .then(res => {
      setData(res.data.data)
    })
  }

  function getPaginationData(){
    let route 
    if(showList.listName === 'readCandidates') route = 'candidates'
    if(showList.listName === 'readContacts') route = 'contacts'
    if(showList.listName === 'readApplications') route = 'applications'
    Axios.get(`http://localhost:3001/${route}?page=${currentPage}&limit=${resultLimit}`)
    .then(res => {
      setPaginationData(res.data.paginationData)
    })
  }
  
  function filterList(listType){
    if(listType === 'readCandidates'){setFilteredList(data)}
    else if(listType === 'readContacts'){setFilteredList(data)}
    else if(listType === 'readApplications'){setFilteredList(data)}
    else{setFilteredList(['No Data'])}

    setFilteredList(prevFiltered => {
        return(
          prevFiltered.filter(application =>{
              //Use Keys to get these values
              if(searchOption === 'Name'){
                return application.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                      application.lastName.toLowerCase().includes(searchKey.toLowerCase())
              }

              else if(searchOption === 'Location'){
                if(application.city) return application.city.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.state) return application.state.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.streetAddress) return application.streetAddress.toString().toLowerCase().includes(searchKey.toLowerCase())
              }

              else if(searchOption === 'Email'){
                if(application.emailAddress) return application.emailAddress.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.managerEmail) return application.managerEmail.toString().toLowerCase().includes(searchKey.toLowerCase())  
              }

              else if(searchOption === 'ID'){
                if(application.idApplications) return application.idApplications.toString().includes(searchKey.toString())
                if(application.idOpenings) return application.idOpenings.toString().includes(searchKey.toString())
                if(application.idContacts) return application.idContacts.toString().includes(searchKey.toString())
                if(application.PersonID) return application.PersonID.toString().includes(searchKey.toString())
                if(application.OpeningId) return application.OpeningId.toString().includes(searchKey.toString())
                if(application.ContactRecruiterId) return application.ContactRecruiterId.toString().includes(searchKey.toString())
                if(application.ApplicationPersonId) return application.ApplicationPersonId.toString().includes(searchKey.toString())
                if(application.ContactApplicationsId) return application.ContactApplicationsId.toString().includes(searchKey.toString())        
              }

              else if(searchOption === 'Phone Number'){
                return application.phoneNumber.toString().includes(searchKey.toString())
              }

              else if(searchOption === 'Status'){
                if(application.currentStatus) return application.currentStatus.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.ApplicationStatus) return application.ApplicationStatus.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.ContactStatus) return application.ContactStatus.toString().toLowerCase().includes(searchKey.toLowerCase())
              }
              else if(searchOption === 'Other'){
                if(application.ContactTimeStamp) return application.ContactTimeStamp.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.ApplicationDate) return application.ApplicationDate.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.position) return application.position.toString().toLowerCase().includes(searchKey.toLowerCase())
                if(application.manager) return application.manager.toString().toLowerCase().includes(searchKey.toLowerCase())
              }

            })
        )  
    })
  
    if(!searchKey){
      setFilteredList(['No Data'])
    }
    
  }
  
  function addCandidate(newCandidate){
    Axios.post('http://localhost:3001/candidate/create', {newCandidate}).then(() => alert("Candidate Created"))
    getCandidateData()
  }

  function updateCandidate(employeeId, updatedCandidate){
    if(!updatedCandidate){
      setSelectedId(employeeId)
      setFormType('update')
      return
    }
    Axios.put(`http://localhost:3001/candidate/update/${employeeId}`, {updatedCandidate}).then(() => alert("Candidate Updated"))
    getCandidateData()
  }

  function deleteCandidate(employeeId){
    const confirmation = confirm(`You are about to delete Candidate: #${employeeId}`)
    if(confirmation){
      Axios.delete(`http://localhost:3001/candidate/delete/${employeeId}`).then(() => alert("Candidate Deleted"))
    }
    getCandidateData()
  }

  function contactCandidate(applicationId){
    setOpenContactForm(true)
    Axios.get(`http://localhost:3001/applications/${applicationId}`).then(res => {
      setOpenContactForm({data: res.data, status: true})
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
        <LandingPage setLoggedIn={setLoggedIn}/> :
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
            deleteCandidate={deleteCandidate} 
            updateCandidate={updateCandidate} 
            scheduleCandidate={scheduleCandidate}
            contactCandidate={contactCandidate} 
            setSearchKey={setSearchKey} 
            setSearchOption={setSearchOption}
            setResultLimit={setResultLimit}
            setCurrentPage={setCurrentPage}
            paginationData={paginationData}
            />}
          {openContactForm.status && <Contacts openContactForm={setOpenContactForm} data={openContactForm.data}/>} 
          {/* {openScheduler && <Scheduler targetCandidate={targetCandidate} openScheduler={setOpenScheduler} setTargetCandidate={setTargetCandidate} />} */}
        </>
      }
    </div>
  );
}

export default App;
