import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

export default function CalendarC() {
  const params = useParams();
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([]); // Initialize as an empty array

  // Fetch tasks from the API
  useEffect(() => {
    async function fetchTasks() {
      const userID = params.userID;
      const categoryID = params.categoryID;

      try {
        const response = await fetch(`http://localhost:3000/api/list/${userID}/${categoryID}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

     
        setTasks(data); // Update tasks state with fetched data
      } catch (err) {
        console.error(err);
      }
    }

    fetchTasks();
  }, [params.userID, params.categoryID]); // Dependencies include params

  // Create a Set of unique task dates
  const taskDates = new Set(tasks.map(task => task.date.split('T')[0]));

  function handleClickDay(date){
    const formattedDate = moment(date).format('YYYY-MM-DD');
    console.log(formattedDate)
    navigate(`/home/${params.userID}/category/${params.categoryID}/${formattedDate}`);
  }


  return (
    <Calendar
    onClickDay={handleClickDay}
      tileClassName={({ date, view }) => {
        if (view === 'month' && taskDates.has(moment(date).format('YYYY-MM-DD'))) {
          return 'selected'; // Assign the custom class name
        }
        return null; // Default tiles have no additional class
      }}
    />
  );
}
