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

    // console.log('process.env', process.env)

    // connect database
    const configs = {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT) ?? 3306,
        user: process.env.DB_USERNAME ?? 'user',
        password: process.env.DB_PASSWORD ?? 'password',
        database: process.env.DB_NAME ?? 'deploy_test'
    }
    const db = mysql.createPool(configs)
    autoMigration(db)

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
    const port = 8080
    app.listen(port)
    console.log(`Server is listening on port ${port}`)
}

autoMigration = async (db) => {
    db.query('SELECT * FROM `users`',
        (error, results) => {
            if(error) {
                db.query(`CREATE TABLE education_db.users (id int AUTO_INCREMENT,firstname varchar(255),lastname varchar(255), PRIMARY KEY (id))`,
                (error, results) => {
                    if(!error) {
                        db.query(`
                            ALTER TABLE education_db.users
                            CHANGE firstname firstname varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
                            CHANGE lastname lastname varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL
                        `)
                    }
                })

            }
        }
    )
}

main()

