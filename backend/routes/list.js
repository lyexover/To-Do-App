const express = require('express')
const mysql = require('mysql2')

const router = express.Router()

const db = mysql.createConnection({
     host : 'localhost', 
     user: 'root', 
     password : '0000', 
     database : 'todo_app'
})
db.connect(err => {
    if(err) console.error('error connecting to mysql from list')
        else console.log('successfully connected to mysql from list')
})


router.post('/list' , (req, res) => {
    const {title , priority, category_id, user_id} = req.body

    const query = 'INSERT INTO tasks(user_id, category_id, title, priority) VALUES (?, ?, ?, ?)'
    db.query(query, [user_id, category_id, title, priority] , (err, results)=> {
        if(err){
            console.error('db error')
            res.status(500).json({message : 'db error'})
        }

        res.status(200).json({message : 'task added successfully'})
    })
})

router.get('/list/:userID/:categoryID' , (req, res)=> {
   const userID = req.params.userID 
   const categoryID = req.params.categoryID

   const query = `SELECT 
                        tasks.id,
                        tasks.title,
                        tasks.priority,
                        tasks.status,
                        tasks.created_at,
                        tasks.updated_at
                  FROM  tasks JOIN categories ON tasks.category_id = categories.id
                  WHERE 
                        tasks.user_id = ? AND tasks.category_id = ?; `

   db.query(query,[userID, categoryID] , (err, results) => {
    if(err) {
        console.error('db error occured')
        return res.status(500).json({message : 'db error'})
    }

    return res.status(200).json(results)
   }) 
})


router.put('/list/:taskID', (req, res) => {
    const taskID = req.params.taskID
    const {status} = req.body
    

    const query = `
        UPDATE tasks
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;

    db.query(query, [status, taskID], (err, results) => {
        if(err){
            console.error('db error')
            res.status(500).json({message : 'db error'})
        }
        res.status(200).json({message : 'task status updated successfully'})
    })
})


module.exports = router