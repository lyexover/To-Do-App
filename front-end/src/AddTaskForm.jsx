import { useState } from 'react';
import { useParams, useNavigate, useRevalidator } from 'react-router-dom';

export default function AddTaskForm() {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Important'); // Default priority
    const [isSubmitting, setIsSubmitting] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const revalidator = useRevalidator()

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

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
                    user_id: params.userID
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            revalidator.revalidate()
            // Navigate back to the list view after successful submission
            navigate(`/home/${params.userID}/category/${params.categoryID}`);

        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error (show error message to user)
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