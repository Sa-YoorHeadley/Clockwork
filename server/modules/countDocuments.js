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

const countDocuments = (table) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS count FROM ${table}`
        connection.query(query, (err, res) => {
            if(err) reject(err)
            resolve(res[0].count)
        })
    })
}

module.exports = countDocuments