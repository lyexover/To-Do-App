import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddTodo = () => {
    if (todoText && selectedDate) {
      const newTodo = {
        text: todoText,
        date: selectedDate
      };
      // Add todo to your list logic here
      console.log(newTodo);
      
      // Reset inputs
      setTodoText('');
      setSelectedDate(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input 
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter todo item"
        className="w-full p-2 border mb-2"
      />
      
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select date and time"
        className="w-full p-2 border mb-2"
      />
      
      <button 
        onClick={handleAddTodo}
        className="w-full bg-blue-500 text-white p-2"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Calendar;