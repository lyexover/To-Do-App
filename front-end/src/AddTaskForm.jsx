import { useState } from 'react';
import { useParams, useNavigate, useRevalidator } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTaskForm() {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Important');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        // Format date properly accounting for timezone
        const formattedDate = selectedDate ? 
            new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
                .toISOString()
                .split('T')[0] 
            : null;

            
        // Format time
        const formattedTime = selectedTime ? 
            `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}` 
            : null;

        try {
            const response = await fetch(`http://localhost:3000/api/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    priority,
                    category_id: params.categoryID,
                    user_id: params.userID,
                    date: formattedDate,
                    time: formattedTime
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            revalidator.revalidate();
            navigate(`/home/${params.userID}/category/${params.categoryID}`);

        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="add-task-overlay">
            <div className="add-task-modal">
                <h3>Add New Task</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter task title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Critical">Critical</option>
                            <option value="Important">Important</option>
                            <option value="Less Important">Less Important</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="datetime">Date and Time</label>
                        <div className="date-time">
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Select date"
                                className="w-1/2 p-2 border"
                            />
                            <DatePicker
                                selected={selectedTime}
                                onChange={time => setSelectedTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                placeholderText="Select time"
                                className="w-1/2 p-2 border"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}