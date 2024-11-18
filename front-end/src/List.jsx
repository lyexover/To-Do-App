import { useLoaderData, useParams, Link, Outlet, useRevalidator } from "react-router-dom"
import { useState, useEffect } from "react"
import './css/list.css'

export async function listLoader({params}) {
    const userID = params.userID
    const categoryID = params.categoryID

    try {
        const response = await fetch(`http://localhost:3000/api/list/${userID}/${categoryID}`)
        const data = await response.json()

        if(!response.ok) {
            throw new Error(data.message)
        }

        return data
    }
    catch(err) {
        console.error(err)
    }
}

export default function List() {
    const params = useParams();
    const tasks = useLoaderData()
    const revalidator = useRevalidator()


    // Derived state for filtered tasks
    const criticalTasks = tasks.filter(task => task.priority === 'Critical')
    const importantTasks = tasks.filter(task => task.priority === 'Important')
    const lessImportantTasks = tasks.filter(task => task.priority === 'Less Important')

    async function toggleStatus(currentStatus, taskID) {
        try {
            const newStatus = currentStatus === 'Done' ? 'Not Done' : 'Done'
            
            const response = await fetch(`http://localhost:3000/api/list/${taskID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update task status');
            }

            const data = await response.json();
            revalidator.revalidate()
            console.log(data.message);


        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }




    return (
        <div className="tasks-container">

             <Link className="addtasklink" to={`/home/${params.userID}/category/${params.categoryID}/addTask`}>
               <span>+</span>Add Task
             </Link>
             <Outlet/>

           <div className="list">
            <h3>Critical Tasks:</h3>
            {criticalTasks.length > 0 ? (
                <ul className="tasks-list">
                {criticalTasks.map(task => (
                    <li key={task.id} className={task.status === 'Done' ? 'done' : 'undone'}>
                        
                        <button 
                            onClick={() => toggleStatus(task.status, task.id)}
                        >
                            {task.status === 'Done' ? <i class="fa-solid fa-circle-check"></i> : <i class="fa-regular fa-circle"></i>}
                        </button>
                        {task.title}
                    </li>
                ))}
                
            </ul>
            ) : (
                <p>No critical Tasks</p>
            )}

            <h3>Important</h3>
            {importantTasks.length > 0 ? (
                <ul className="tasks-list">
                    {importantTasks.map(task => (
                        <li key={task.id} className={task.status === 'Done' ? 'done' : 'undone'}>
                            
                            <button 
                                onClick={() => toggleStatus(task.status, task.id)}
                            >
                                {task.status === 'Done' ? <i class="fa-solid fa-circle-check"></i> : <i class="fa-regular fa-circle"></i>}
                            </button>
                            {task.title}
                        </li>
                    ))}
                    
                </ul>
            ) : (
                <p>No important tasks.</p>
            )}

            <h3>Less Important</h3>
            {lessImportantTasks.length > 0 ? (
                <ul className="tasks-list">
                {lessImportantTasks.map(task => (
                    <li key={task.id} className={task.status === 'Done' ? 'done' : 'undone'}>
                        
                        <button 
                            onClick={() => toggleStatus(task.status, task.id)}
                        >
                            {task.status === 'Done' ? <i class="fa-solid fa-circle-check"></i> : <i class="fa-regular fa-circle"></i>}
                        </button>
                        {task.title}
                    </li>
                ))}
                
            </ul>
            ) : (
                <p>No less important tasks.</p>
            )}
            </div>
        </div>
    )
}