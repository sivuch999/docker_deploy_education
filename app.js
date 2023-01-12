const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mysql = require('mysql2')

const main = () => {
    dotenv.config({ path: '.env' })

    // use express lib
    const app = express()
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // console.log(process.env)

    // connect database
    const db = mysql.createConnection({
        host: process.env.DB_HOST ?? 'localhost',
        port: process.env.DB_PORT ?? 3307,
        user: process.env.DB_USERNAME ?? 'user',
        password: process.env.DB_PASSWORD ?? 'password',
        database: process.env.DB_NAME ?? 'deploy_test'
    })

    // set the view engine to ejs
    app.set('view engine', 'ejs')

    // index page
    app.get('/', function(req, res) {
        db.query('SELECT * FROM `users`',
        (error, results) => {
            if(error) { throw error }
            res.render('index', { results })
        })
    })

    // insert api
    app.post('/insert', function(req, res) {
        const { firstname, lastname } = req.body
        db.query('INSERT INTO `users`(`firstname`, `lastname`) VALUES (?, ?)', [firstname, lastname],
        (error, results) => {
            if(error) { throw error }
            setTimeout(() => { res.redirect('/') }, 500)
        })
    })

    // update api
    app.post('/update', function(req, res) {
        const { id, firstname, lastname } = req.body
        db.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}' WHERE id = ?`, [id],
        (error, results) => {
            if(error) { throw error }
            res.status(200).json(results)
        })
    })

    // delete api
    app.get('/delete', function(req, res) {
        const { id } = req.query
        db.query('DELETE FROM `users` WHERE id = ?', [id],
        (error, results) => {
            if(error) { throw error }
            setTimeout(() => { res.redirect('/') }, 500)
        })
    })

    // start server
    app.listen(8080)
    console.log('Server is listening on port 8080')
}

main()

