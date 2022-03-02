const express = require('express')
const app = express()

const mysql = require('mysql')
const db = mysql.createConnection({
    user: 'root',
    host: '',//192.168.1.13
    password: 'password',
    database: 'crudDatabase'
})

app.post('/create', (req, res) =>{
    const { firstName, lastName, age, country, position, wage } = req.body.formData
    db.query('INSERT INTO employees (formData) VALUES')
})

app.listen(3001, ()=>{
    console.log('Server running')
})