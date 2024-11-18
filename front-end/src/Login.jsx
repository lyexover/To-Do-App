import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"



export default function Login(){

const navigate = useNavigate()

const [formData, setFormData] = useState({
    email : '', 
    password : ''
})

function handleChange(event){
     const {name , value} = event.target 


     setFormData(prev => ({
         ...prev , 
         [name] : value
     }))
}


async function handleSubmit(event){

    event.preventDefault()

   

    try{
        const response = await fetch('http://localhost:3000/api/auth/login' , {
            method : 'POST',
            headers : {"content-type" : "application/json"},
            body : JSON.stringify( {
                email : formData.email, 
                password : formData.password
        })
     })

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data.error)
        }

        console.log(data.message)
        localStorage.setItem('token', data.token)
        navigate(`/home/${data.id}`)

    }
    catch(err){
        console.error(err)
    }
}



    return (
        <div>
            <h1 className="logo">TaskHive</h1>
        <div className="auth-container">
            <div className="form">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label>Email 
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter Email..."/>
                </label>
                <label>Password
                   <input type="password" name="password" required value = {formData.password} onChange={handleChange} placeholder="Enter Password..." />
                </label>
                <button type="submit">Login</button>
            </form>
            </div>
            <div className="option">
                <p>Don't have an account yet ?</p>
                <Link to='/signup'>SignUp</Link>
            </div>
        </div>
        </div>
    )
}