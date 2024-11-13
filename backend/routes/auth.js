const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2')
const router = express.Router()


const Secret = 'u4s5@J1k9Fh8g3R#9z6H$w8V4n2t7d1X!q'


const db = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : '0000', 
    database : 'todo_app'
}) ; 

db.connect((err) => {
    if(err) console.error('error connecting to mysql')
    else console.error('succesfully connected to mysql')
})



router.post('/signup', (req, res) => {
    const {username, email, password} = req.body

    db.query('SELECT * FROM users WHERE email = ?' , [email] , (err , results) => {
        if(err) {
            return res.status(500).json({error : 'DB error'})
        }

        if(results.length > 0){
            return res.status(400).json({error : 'user already exists'})
        }

        bcrypt.hash(password , 10, (err, hashedPassword) => {
            if(err) {
                return res.status(500).json({error : 'error hashing password'})
            }

            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
            db.query(query, [username, email, hashedPassword] , (err, results) => {
                if(err) {
                    return res.status(500).json({error : 'database insertion error'})
                }


                res.status(201).json({ message: 'User registered successfully' });
            })
        })
    })
})




router.post('/login', (req, res) => {
    const {email, password} = req.body
    

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if(err) {
            return res.status(500).json({error : 'database error'})
        }
        

        if(results.length === 0){
            return res.status(400).json({error : 'user does not exist , SIGNUP!'})
        }

        const user = results[0]
        
        bcrypt.compare(password, user.password, (err, isMatch)=> {
            
            if(err) {
                return res.status(500).json({error : 'error comparing passwords'})
            }

            if(!isMatch){
                return res.status(400).json({error : 'incorrect password'})
            }


            const token = jwt.sign({userId : user.id} , Secret , {expiresIn : '1h'})

            res.status(200).json({message : 'Login successful', token})
        })
    })
})

module.exports = router