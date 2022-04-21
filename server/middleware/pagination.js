// const mysql = require('mysql')
const countDocuments = require('../modules/countDocuments')
const find = require('../modules/find')


const pagination = (table) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        
        const totalRecordsLength = await countDocuments(table)
        
        let totalPages
        if(totalRecordsLength % limit > 0){
            totalPages= Math.floor(totalRecordsLength / limit) + 1
        } else {
            totalPages= Math.floor(totalRecordsLength / limit)
        }
        
        let showingUntil
        if(limit * page > totalRecordsLength){
            showingUntil = totalRecordsLength
        } else {
            showingUntil = limit * page
        }
        
        const records = await find(
            table,
            {
                limit,
                skip: limit * (page - 1)
            }
        ) 
        
        let fromPage, untilPage;

        fromPage = page === 1 ? page : page - 1;
        untilPage = fromPage + 5;

        if (untilPage > totalPages) {
        untilPage = totalPages;
        fromPage = untilPage - 5;
            if(fromPage > 5){
            }
        }

        const pageArray = []
        for(let i = fromPage; i <= untilPage; i++){
            pageArray.push(i)
        }

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        
        let nextPage
        if(endIndex < totalRecordsLength) { 
            nextPage = page + 1
        }
        let previousPage
        if(startIndex > 0 ) {
            previousPage = page - 1
        }
        
        
        res.results = {
            data: records,
            paginationData : {
                nextPage,
                previousPage,
                fromPage,
                untilPage,
                pageArray,
                totalPages,
                currentPage: page,
                showingFrom: limit * (page - 1) + 1,
                showingUntil,
                totalResults: totalRecordsLength
            }
        }

        next()
    }
}

module.exports = pagination