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
        navigate('/home')

    }
    catch(err){
        console.error(err)
    }
}
    return (
  
        <body>
    <div className="login">
           <form onSubmit={handleSubmit}>
            <h1>login</h1>
            

            <div class='input-field'>
             <input type="email" 
             name="email" 
             placeholder=" "
             required 
             value={formData.email} 
             onChange={handleChange}/>
             <label> Enter your email </label>
            </div>   
            <div class='input-field'>
            <i class = "fa-solid fa-lock"></i>
            
               <input type="password"
                name="password" 
                placeholder=" "
                required 
                value = {formData.password}
                onChange={handleChange}  />   
             <label for='login-pass'>Enter your password </label> 
             <i class='fa-regular fa-eye-slash'></i>            
            </div>
            <div class ='check-group' >
               <div class='check-box'>
                 <input type="checkbox" checked></input>  
                 <label >Remember me</label>
                </div>
              < a href="">Forgot Password</a>
            </div>
               <button type="submit">login</button>
            
             <p>Don't have an account yet ?
             <a href='/signup'>  SignUp</a>
             </p>
           </form>
     </div>      
</body>
    )
}  

 