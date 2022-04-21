const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connection.connect(err => {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
})

const find = (table, options) =>{
    return new Promise((resolve, reject) => {
        let query
        if(table === 'Persons'){
            query = `SELECT * FROM ${table} LIMIT ${options.skip}, ${options.limit}`
        }
        if(table === 'Applications'){
            query = `SELECT *
            FROM ${table}
            JOIN Openings 
            ON ${table}.OpeningId=Openings.idOpenings
            JOIN Persons 
            ON Persons.PersonID=${table}.ApplicationPersonId
            WHERE ApplicationStatus = "Pending"
            LIMIT ${options.skip}, ${options.limit}
            `
        }
        if(table === 'Contacts'){
            query = `SELECT *
            FROM ${table}
            JOIN Applications 
            ON ${table}.ContactApplicationsId=Applications.idApplications
            JOIN Persons
            ON Persons.PersonID=Applications.ApplicationPersonId
            JOIN Recruiters 
            ON Contacts.ContactRecruiterId=Recruiters.idRecruiters
            JOIN Openings 
            ON Applications.OpeningId=Openings.idOpenings
            LIMIT ${options.skip}, ${options.limit}
            `
        }
        
        connection.query(query, (err, res) =>{
            if(err) reject(err)
            resolve(res)
        }) 
    })
}

module.exports = find