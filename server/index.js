require('dotenv').config();
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');

// CREATE AND TEST CONNECTION
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
})
connection.connect(err => {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3001
// LISTEN
app.listen(3001, ()=>{
    console.log(`Server running on port ${port}`)
})

// ROOT FUNCTION
app.get("/", async (req, res) => {
    res.json({status: 'Running'})
})


//GET ALL CANDIDATES 
app.get('/candidates', async (req, res) =>{
    const query = `SELECT * FROM Persons`
    connection.query(query, (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results)
        }
    })
})

//GET ALL APPLICATIONS 
app.get('/applications', async (req, res) =>{
    const query = `SELECT *
    FROM Applications
    JOIN Openings 
        ON Applications.OpeningId=Openings.idOpenings
    JOIN Persons 
        ON Persons.PersonID=Applications.ApplicationPersonId
    WHERE ApplicationStatus = "Pending"
    `
    connection.query(query, (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results)
        }
    })
})

//GET ALL CONTACTS
app.get('/contacts', async (req, res) =>{  
    const query = `SELECT *
    FROM Contacts
    JOIN Applications 
        ON Contacts.ContactApplicationsId=Applications.idApplications
    JOIN Persons 
        ON Persons.PersonID=Applications.ApplicationPersonId`
    connection.query(query, (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results)
        }
    })
})

//GET APPLICATION BY ID
app.get('/applications/:id', async (req, res) =>{
    const {id} = req.params
    const query = `SELECT *
    FROM Applications
    JOIN Openings 
        ON Applications.OpeningId=Openings.idOpenings
    JOIN Persons 
        ON Persons.PersonID=Applications.ApplicationPersonId
    WHERE Applications.idApplications = ?`
    connection.query(query, id , (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results)
        }
    })
})


// CREATE CANDIDATE
app.post('/candidate/create', (req,res) => {
    const {currentStatus, lastName, firstName, emailAddress, city, state} = req.body.newEmployee
    const query = `INSERT INTO Persons(currentStatus, lastName, firstName, emailAddress, city, state)
    VALUES (?,?,?,?,?,?)
    `
    connection.query(query, [currentStatus, lastName, firstName, emailAddress, city, state], (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results[0])
        }
    })
})


//DELETE CANDIDATE
app.delete('/candidate/delete/:id', (req,res) => {
    const {id} = req.params
    console.log(id)
    const query = `DELETE FROM Persons WHERE PersonID = ?`
    connection.query(query, id, (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results[0])
        }
    })
})

//UPDATE CANDIDATE
app.put('/candidate/update/:id', (req,res) => {
    const {id} = req.params
    const {currentStatus, lastName, firstName, emailAddress, city, state} = req.body.updatedEmployee
    const query = `UPDATE Persons SET currentStatus=?, lastName=?, firstName=?, emailAddress=?, city=?, state=? WHERE PersonID=?`
    connection.query(query, [currentStatus, lastName, firstName, emailAddress, city, state, id], (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results[0])
        }
    })
})



// CREATE CONTACT
app.post('/contact/create', (req,res) => {
    const ContactTimeStamp = new Date()
    const ContactRecruiterId = 9999
    const ContactApplicationsId = 9999
    const {contactStatus} = req.body.formData
    const query = `INSERT INTO Contacts(ContactTimeStamp, ContactStatus, ContactRecruiterId, ContactApplicationsId)
    VALUES (?,?,?,?)
    `
    connection.query(query, [ContactTimeStamp, contactStatus, ContactRecruiterId, ContactApplicationsId], (error, results) =>{
        if(error){
            throw error
        }
        if(!results[0]){
            res.json({status: 'No Results'})
        } else {
            res.json(results[0])
        }
    })
})