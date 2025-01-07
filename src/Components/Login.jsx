

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FlowerImages from "./images/img1.jpg";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const apiUrl = "https://672863f4270bd0b975553389.mockapi.io/cruddata/LoginForm";

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Login Successful:", data);
                    // alert('Login Successfully')
                    navigate("/Register");
                } else {
                    setErrors({ general: "Login failed. Please check your credentials." });
                }
            } catch (error) {
                console.error("Error:", error);
                setErrors({ general: "An error occurred. Please try again later." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const Register = () => {
        navigate("/Register");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#2b2b2b",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "850px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#fff",
                }}
            >
            
                <div style={{ flex: 1, position: "relative" }}>
                    <img
                        src={FlowerImages}
                        alt="Beautiful flower"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        <h2>Beautiful Place! and Beautiful Memories!!!</h2>
                    </div>
                </div>

             
                
                <div style={{ flex: 1, padding: "40px", backgroundColor: "#1e1e2f" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="usericon">
                            <i className="bx bxs-user-circle" id="icon1"></i>
                        </div>
                        <h1 style={{ color: "#fff", marginBottom: "20px", marginLeft: "65px" }}>Create an Account</h1>

                        <label style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
                            Username
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    margin: "10px 0",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.username}
                                </p>
                            )}
                        </label>

                        <label style={{ display: "block", color: "#fff", marginBottom: "10px" }}>
                            Password
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    margin: "10px 0",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.password}
                                </p>
                            )}
                        </label>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                                style={{ marginRight: "5px" }}
                            />
                            <span style={{ color: "#fff" }}>Show Password</span>
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            style={{
                                width: "106%",
                                padding: "10px",
                                backgroundColor: "#6c63ff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                marginTop: "10px",
                                cursor: "pointer",
                            }}
                        >
                            {formik.isSubmitting ? "Logging in..." : "Login"}
                        </button>
                        {formik.errors.general && (
                            <p style={{ color: "red", marginTop: "10px" }}>
                                {formik.errors.general}
                            </p>
                        )}
                        <p style={{ color: "#ccc", marginTop: "20px", marginLeft: "100px" }}>
                            Don't have an account?{" "}
                            <a
                                href=""
                                onClick={Register}
                                style={{ color: "#6c63ff", textDecoration: "none" }}
                            >
                                Signup
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
