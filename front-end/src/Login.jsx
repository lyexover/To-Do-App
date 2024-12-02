import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './css/auth.css'

export default function Login(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '', 
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    function handleChange(event){
        const {name, value} = event.target 
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    email: formData.email, 
                    password: formData.password
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
        <div className="auth-contain">
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <h1 className="logo">TaskHive</h1>
                        <p className="login-subtitle">Organize Your World, One Task at a Time</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <i className="material-icons">email</i>
                                
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                required 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Enter your email"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <i className="material-icons">lock</i>
                               
                            </label>
                            <div className="password-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password" 
                                    required 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="Enter your password"
                                    className="form-input"
                                />
                                <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="login-button">
                                Log In
                            </button>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account?</p>
                        <Link to='/signup' className="signup-link">
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}