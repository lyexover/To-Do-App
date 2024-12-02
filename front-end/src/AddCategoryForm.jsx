import { useState } from "react"
import { useNavigate, useParams, useRevalidator } from "react-router-dom"


export default function AddCategoryForm(){

    const [inputData, setInputData] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    const revalidator = useRevalidator()

    function handleChange(event) {
        const {value} = event.target
        setInputData(value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const userID = params.userID
        
        try {
            const response = await fetch(`http://localhost:3000/api/categories/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: inputData})
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message)
            }
            
            // Revalidate the route data before navigating
            revalidator.revalidate()

            console.log('category Added successfully')
            navigate(`/home/${userID}`)
        }
        catch(err) {
            console.error(err)
        }
    }


    return (
        <div className="add-task-overlay">
            <div className="add-task-modal">
                <h3>Add New Collection</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Collection name</label>
                        <input 
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Add Collection.."
                        value={inputData}
                        onChange={handleChange}
                    />
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
                            className="submit-button"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}