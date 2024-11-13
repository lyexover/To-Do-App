import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './css/auth.css'


export default function Signup(){

    const navigate = useNavigate()

const [formData, setFormData] = useState({
    username : '',
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
        const response = await fetch('http://localhost:3000/api/auth/signup' , {
            method : 'POST',
            headers : {"content-type" : "application/json"},
            body : JSON.stringify( {
                username : formData.username,
                email : formData.email, 
                password : formData.password
        })
     })

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data.error)
        }

        console.log(data.message)
        navigate('/login')

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
               <h1>Sign up</h1>
               <form onSubmit={handleSubmit}>
                <label>Username 
                   <input type="text" name="username" required value={formData.username} onChange={handleChange} placeholder="Enter username..."/>
                 </label>
                 <label> Email 
                   <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter email..."/>
                   </label>
                   <label>Pasword 
                   <input type="password" name="password" required value = {formData.password} onChange={handleChange} placeholder="Enter password..." />
                   </label>
                   <button type="submit">Signup</button>
               </form>
               </div>
               <div className="option">
                 <p>Already have an account ?</p>
                 <Link to='/login'>Login</Link>
               </div>
            
            
        </div>
        </div>
    )
}