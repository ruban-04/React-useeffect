// import React from 'react'

// function Login() {
//   return (
//     <div>
//       <h1></h1>
//     </div>
//   )
// }

// export default Login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState({}); 

    const apiUrl = "https://672863f4270bd0b975553389.mockapi.io/cruddata/LoginForm";

    const validateForm = () => {
        const validationErrors = {};
        if (!username.trim()) {
            validationErrors.username = "Username is required";
        }
        if (!password.trim()) {
            validationErrors.password = "Password is required";
        }
        setErrors(validationErrors);
        return object.keys(validationErrors).length === 0;
    };

        const handleSubmit = async (e) => {
        e.preventDefault();
         
        if (!validateForm()) {
            return; 
        }

        try {
            const response = await fetch(apiUrl, {
                method: "PoST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSoN.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login Successful:", data);
                setErrorMessage(null);
                navigate("/formdata");
            } else {
                setErrorMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("an error occurred. Please try again later.");
        }
    };

    const Registerform = () => {
        navigate("/RegisterForm");
    };
              
    return (
        <form className="form1" onSubmit={handleSubmit}>
            <div className="usericon">
                <i className="bx bxs-user-circle" id="icon1"></i>
            </div>
            <h1 className="head1">Login Form</h1>
            <label className="label">
                Username
                <input
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p style={{ color: "red" ,fontSize:13,paddingLeft:10,marginTop:0,marginBottom:0}}>{errors.username}</p>}
            </label>
            <br />
            <label className="label">
                Password
                <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ color: "red", fontSize:13,paddingLeft:10,marginTop:0,marginBottom:0}}>{errors.password}</p>}
            </label>
            <a className="password" href="">
                Forgot Password?
            </a>
            <br />
            <div className="submit">
                <button className="button2" type="submit">
                    Login
                </button>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <p className="para1">
                Don't have an account?
                <a className="link" href="" onClick={Registerform}>
                    Signup
                </a>
            </p>
        </form>
    );
}

export default Login;
