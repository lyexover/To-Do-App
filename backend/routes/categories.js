const express = require('express')
const mysql = require('mysql2')

const router = express.Router()

const db = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : '0000', 
    database : 'todo_app'
})

db.connect(err => {
    if(err) console.error('error connecting to mysql from categories')
        else console.log('successfully connected to mysql from categories')
})


router.get('/categories/:userID', (req, res) => {
    const userID = req.params.userID

    db.query('SELECT categories.name, categories.id FROM users JOIN categories ON users.id = categories.user_id WHERE users.id = ?', 
        [userID] , (err, results) => {
            if(err){
                console.error('erreur lors de la recuperation des categories')
                return res.status(500).json({message : 'erreur lors de la recuperation des categories'})
            }

            return res.status(200).json(results)
        }
    )
})


router.post('/categories/:userID', (req, res) => {
    const userID = req.params.userID 
    const {name} = req.body

    db.query('INSERT INTO categories(name, user_id) VALUES (?, ?)', [name, userID], 
        (err, results) => {
            if(err) {
                console.error('database error : adding category')
                return res.status(500).json({message: 'database error : adding category'})
            }

            // Return the complete category object including the new ID
            return res.status(201).json({
                id: results.insertId,  // MySQL provides the new ID in results.insertId
                name: name,
                user_id: userID
            })
        }
    )
})


router.get('/categories/:userID/RadarData', (req, res) => {
    const userID = req.params.userID
    const query = `
        SELECT 
          c.name AS category_name,
          COUNT(t.id) AS task_count
               FROM 
                 categories c
                LEFT JOIN 
                 tasks t 
                ON 
                  c.id = t.category_id
              GROUP BY 
               c.id, c.name; `

             db.query(query, (err, results)=> {
                if(err) {
                    console.errror('database error : error getting #tasks/ categories')
                    return res.status(500).json({message : 'database error : error getting #tasks/ categories'})
                }
                return res.status(200).json(results)
             })
})


router.delete('/categories/:categoryID' , (req, res) => {
    const toDeleteID = req.params.categoryID
    const query = `
       DELETE FROM categories 
       WHERE id = ?
    `
    db.query(query , [toDeleteID] , (err, results) => {
        if(err){
            console.log('db error')
            return res.status(500).json({message : 'db error'})
        }
        return res.status(200).json({message : 'deleted succesfully'})
    })
})

module.exports = router