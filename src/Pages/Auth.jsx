import React from 'react'
import { useState } from 'react';
import { login, Signup } from '../firebaseAuth';
import { toast } from 'react-toastify';
const initialstate={
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState(initialstate);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            if (isLogin) {
                await login(formData.email,formData.password)
                // toast.success("Signin successful");
            } else {
                   
                    if(formData.password===formData.confirmPassword){
                        await Signup(formData.firstName,formData.lastName,formData.email,formData.password);
                        // toast.success("Signup successful");
                    }
                    else{
                        toast.error("Passwords mismatch")
                    }
            }
        } catch (error) {
            toast.error(error.code)
        }
     
    };
  
    const toggleFormMode = () => {
      setIsLogin(!isLogin);
      setFormData(initialstate);
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-white" style={{ width: '500px' }}>
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          
          {!isLogin && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </>
          )}
          
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          )}
          
          <button type="submit" className="btn btn-primary w-100 mb-3">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          
          <button type="button" onClick={toggleFormMode} className="btn btn-link w-100">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </form>
      </div>
    );
}

export default Auth
