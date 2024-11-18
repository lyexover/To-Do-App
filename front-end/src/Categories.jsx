import { Link, useLoaderData, useParams } from "react-router-dom"
import { useState } from "react"

export async function categoriesLoader({params}) {
    const userID = params.userID
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${userID}`)
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

export default function Categories() {
    const categories = useLoaderData()
    const params = useParams()
    const [activeId, setActiveId] = useState(null)  // New state for active category ID
    
    
    // Simplified toggle function
    const toggleActive = (id) => {
        setActiveId(currentId => currentId === id ? null : id)
    }
    
    return (
        <div className="categories-container">
            <div className="categories-header">
                <h3>Collections</h3>
                 <Link className="add-cat" to={`/home/${params.userID}/addCategory`}><i class="fa-solid fa-circle-plus"></i> Add collection</Link>

            </div>
            
            <ul>
                {categories.map(category => (
                    <li 
                        className={category.id === activeId ? 'active' : ''} 
                        onClick={() => toggleActive(category.id)} 
                        key={category.id}
                    >
                        <Link className="link" to={`/home/${params.userID}/category/${category.id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}