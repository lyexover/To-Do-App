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
    <body>
            
        <div className="login">
               <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <div class="input-field">
                 <input 
                 type="text" 
                 name="username" 
                 placeholder=" "
                 required 
                 value={formData.username} 
                 onChange={handleChange} />
                 <label>Enter your username </label>
                </div>
                <div class='input-field'>
                 <input type="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange}/>
                 <label> Enter your email </label>
                </div>   
                <div class='input-field'>
                   
                   <input type="password" name="password" placeholder=" " required value = {formData.password} onChange={handleChange}  />                
                <label>Enter your password </label>
                </div>
                   <button type="submit">Sign up</button>
                <div className="option">
                 <p>Already have an account ?<a href='/login'> Login</a></p>
                 
                </div>
               </form>
         </div>      
    </body>
    )
}