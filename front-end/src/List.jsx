import { useLoaderData, useParams, Link, Outlet, useRevalidator } from "react-router-dom";
import { useState } from "react";
import './css/list.css';
import CalendarC from "./Calendar";

export async function listLoader({ params }) {
  const userID = params.userID;
  const categoryID = params.categoryID;

  try {
    const response = await fetch(`http://localhost:3000/api/list/${userID}/${categoryID}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default function List() {
  const params = useParams();
  const tasks = useLoaderData();
  const revalidator = useRevalidator();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = searchQuery
    ? tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks;

  const criticalTasks = filteredTasks.filter(task => task.priority === 'Critical');
  const importantTasks = filteredTasks.filter(task => task.priority === 'Important');
  const lessImportantTasks = filteredTasks.filter(task => task.priority === 'Less Important');

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    revalidator.revalidate();
  };

  const handleDelete = async (taskID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/list/${taskID}/${params.categoryID}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to delete task: ${data.message}`);
      }

      revalidator.revalidate();
      console.log(data.message);
    } catch (error) {
      console.error(`Error deleting task: ${error.message}`);
    }
  };

  const toggleStatus = async (currentStatus, taskID) => {
    try {
      const newStatus = currentStatus === 'Done' ? 'Not Done' : 'Done';
      const response = await fetch(`http://localhost:3000/api/list/${taskID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update task status');
      }

      revalidator.revalidate();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const formatDateTime = (date, time) => {
    if (!date) return '';
    return `${date} - ${time || ''}`;
  };

  const renderTaskList = (tasks, title) => (
    <>
      <h3>{title}</h3>
      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className={task.status === 'Done' ? 'done' : 'undone'}>
              <div>
                <button onClick={() => toggleStatus(task.status, task.id)}>
                  {task.status === 'Done' ? (
                    <i className="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-regular fa-circle"></i>
                  )}
                </button>
                {task.title}
                <p>{formatDateTime(task.date, task.time)}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()}</p>
      )}
    </>
  );

  return (
    <div className="container">
      <div className="tasks-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={() => handleSearch('')}>
          <i class="fa-solid fa-x"></i>
          </button>
        </div>
        <Link className="addtasklink" to={`/home/${params.userID}/category/${params.categoryID}/addTask`}>
          <span>
            <i className="fa-solid fa-circle-plus"></i>
          </span>
          Add Task
        </Link>
        <Outlet />
        <div className="list">
          {renderTaskList(criticalTasks, 'Critical Tasks')}
          {renderTaskList(importantTasks, 'Important Tasks')}
          {renderTaskList(lessImportantTasks, 'Less Important Tasks')}
        </div>
      </div>
      <CalendarC />
    </div>
  );
}