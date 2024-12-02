// TasksPerDay.jsx
import React from 'react';
import { useLoaderData, useParams } from "react-router-dom";

export async function tasksPerDayLoader ({params}) {
   const {userID, categoryID, date} = params;

   try {
    const response = await fetch(`http://localhost:3000/api/list/${userID}/${categoryID}/${date}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tasks');
    }
    return data;
 
   } catch (err) {
     console.error(err);
     throw err;
   }
}

export default function TasksPerDay(){
    const data = useLoaderData();
    const { userID, categoryID, date } = useParams();
    
    console.log('Tasks for date:', date);
    console.log('Tasks data:', data);
   
    return (
        <div className='add-task-overlay'>
            <div className="add-task-modal">
            <h2>Tasks for {date}</h2>
            {data && data.length > 0 ? (
                <ul className='tasks-list'>
                    {data.map(task => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found for this date</p>
            )}
            </div>
        </div>
    )
}