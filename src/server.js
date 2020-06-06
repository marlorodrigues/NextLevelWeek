const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const dbm = require('./database/db')

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})



server.get('/', (req, res) => {


    return res.render('index.html')
})

server.get('/create-point', (req, res) => {

    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {

    const query = `INSERT INTO places
                        (
                            name,
                            image, 
                            address, 
                            number, 
                            state, 
                            city, 
                            itens
                        )
                        values (?, ?, ?, ?, ?, ?, ?);`

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city[0],
        req.body.itens,
    ]

    dbm.run(query, values, function (error) {
        if (error)
            return res.status(404).send({ error })


        return res.render('create-point.html', { saved: true })
    })
})

server.get('/search-results', (req, res) => {

    dbm.all(`SELECT * FROM places;`, function (error, rows) {
        if (error)
            return console.log(error)

        const total = rows.length

        return res.render('search-results.html', { places: rows, lenght: total })
    })
})

server.listen(3000)
