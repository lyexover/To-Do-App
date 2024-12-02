const express = require('express')
const mysql = require('mysql2')

const router = express.Router()

const db = mysql.createConnection({
     host: 'localhost', 
     user: 'root', 
     password: '0000', 
     database: 'todo_app',
     // Add timezone configuration
     timezone: 'Z'  // This will keep dates in UTC
})

db.connect(err => {
    if(err) console.error('error connecting to mysql from list')
    else console.log('successfully connected to mysql from list')
})

router.post('/list', (req, res) => {
    const {title, priority, category_id, user_id, date, time} = req.body

    const query = 'INSERT INTO tasks(user_id, category_id, title, priority, date, time) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(query, [user_id, category_id, title, priority, date, time], (err, results) => {
        if(err){
            console.error('db error', err)
            return res.status(500).json({message: 'db error'})
        }
        res.status(200).json({message: 'task added successfully'})
    })
})

router.get('/list/:userID/:categoryID', (req, res) => {
   const userID = req.params.userID 
   const categoryID = req.params.categoryID

   const query = `
        SELECT 
            tasks.id,
            tasks.title,
            tasks.priority,
            tasks.status,
            tasks.created_at,
            tasks.updated_at,
            DATE_FORMAT(tasks.date, '%Y-%m-%d') as date,
            tasks.time
        FROM tasks 
        JOIN categories ON tasks.category_id = categories.id
        WHERE tasks.user_id = ? AND tasks.category_id = ?
   `

   db.query(query, [userID, categoryID], (err, results) => {
    if(err) {
        console.error('db error occured', err)
        return res.status(500).json({message: 'db error'})
    }
    return res.status(200).json(results)
   }) 
})


router.get('/list/:userID', (req, res) => {
    const userID = req.params.userID;
 
    const query = `
         SELECT 
             tasks.id,
             tasks.title,
             tasks.priority,
             tasks.status,
             tasks.created_at,
             tasks.updated_at,
             DATE_FORMAT(tasks.date, '%Y-%m-%d') as date,
             tasks.time
         FROM tasks 
         WHERE tasks.user_id = ?
    `;
 
    db.query(query, [userID], (err, results) => {
     if (err) {
         console.error('DB error occurred', err);
         return res.status(500).json({ message: 'DB error' });
     }
     return res.status(200).json(results);
    });
 });
 

router.put('/list/:taskID', (req, res) => {
    const taskID = req.params.taskID
    const {status} = req.body

    const query = `
        UPDATE tasks
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `

    db.query(query, [status, taskID], (err, results) => {
        if(err){
            console.error('db error', err)
            res.status(500).json({message: 'db error'})
        }
        res.status(200).json({message: 'task status updated successfully'})
    })
})

router.delete('/list/:taskID/:categoryID', (req, res) => {
    const { taskID, categoryID } = req.params; // Extract parameters from the route

    const query = 'DELETE FROM tasks WHERE id = ? AND category_id = ?';

    db.query(query, [taskID, categoryID], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the actual error for debugging
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.affectedRows === 0) {
            // No rows were deleted, likely invalid IDs
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    });
});


router.get('/list/:userID/:categoryID/:date', (req, res) => {
    
    const {userID, categoryID, date} = req.params
    const query = `SELECT 
             tasks.id,
             tasks.title,
             tasks.priority,
             tasks.status,
             tasks.created_at,
             tasks.updated_at,
             DATE_FORMAT(tasks.date, '%Y-%m-%d') as date,
             tasks.time
         FROM tasks 
         WHERE tasks.user_id = ? 
         AND tasks.category_id = ?
         AND tasks.date = ?
         `
    db.query(query, [userID, categoryID, date] , (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the actual error for debugging
            return res.status(500).json({ message: 'Database error' });
        }
        return res.status(200).json(results)
    })
})

module.exports = router