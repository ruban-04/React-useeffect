import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import images from './images/img1.jpg';

function Register() {
    const navigate = useNavigate();

    const apiUrl = "https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm";

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
            address: "",
           
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("Firstname is required*"),
            lastname: Yup.string().required("Lastname is required*"),
            email: Yup.string()
                .email("Invalid email format*")
                .required("Email is required*"),
            mobile: Yup.string()
                .matches(/^\d{10}$/, "Mobile number must be 10 digits*")
                .required("Mobile number is required*"),
            password: Yup.string().required("Password is required*"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords do not match*")
                .required("Confirm Password is required*"),
            address: Yup.string().required("Address is required*"),
            state: Yup.string().required("State is required*"),
            country: Yup.string().required("Country is required*"),
        }),
        onSubmit: async (values, { resetForm }) => {
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
                    console.log("Registration Successful:", data);
                    resetForm();
                    navigate("/RegisterData");
                } else {
                    alert("Registration failed. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            }
        },
    });

    const handleLogin = () => {
        navigate("/LoginForm");
    };

    return (
        <div style={{display:'flex',margin:'3rem 17rem'}}>
            <img src={images} style={{width:'500px' }}/>
        <form className="form2" onSubmit={formik.handleSubmit}>
            <h1 className="head2">Register Here</h1>
            <div style={{ display: "flex",width:'95%'}}>
                <label className="label1 ">
                    Firstname
                    <input
                        className="box2"
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                        <p style={{ color: "red", fontSize: 13, paddingLeft: 7, marginTop: 0 }}>
                            {formik.errors.firstname}
                        </p>
                    )}
                </label>
                <label className="label1"style={{marginLeft:'3rem'}}>
                    Lastname
                    <input
                        className="box2"
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                        <p style={{ color: "red", fontSize: 13, paddingLeft: 7, marginTop: 0 }}>
                            {formik.errors.lastname}
                        </p>
                    )}
                </label>
            </div>
            <label className="label2">
                Email
                <input
                    className="box3"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p style={{ color: "red", fontSize: 13, paddingLeft: 20, marginTop: 0 }}>
                        {formik.errors.email}
                    </p>
                )}
            </label>
            <label className="label2">
                Mobile Number
                <input
                    className="box3"
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                    <p style={{ color: "red", fontSize: 13, paddingLeft: 20, marginTop: 0 }}>
                        {formik.errors.mobile}
                    </p>
                )}
            </label>
            <label className="label2">
                Password
                <input
                    className="box3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p style={{ color: "red", fontSize: 13, paddingLeft: 20, marginTop: 0 }}>
                        {formik.errors.password}
                    </p>
                )}
            </label>
            <label className="label2">
                Confirm Password
                <input
                    className="box3"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p style={{ color: "red", fontSize: 13, paddingLeft: 20, marginTop: 0 }}>
                        {formik.errors.confirmPassword}
                    </p>
                )}
            </label>
            <label className="label2">
                Address
                <input
                    className="box3"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                    <p style={{ color: "red", fontSize: 13, paddingLeft: 20, marginTop: 0 }}>
                        {formik.errors.address}
                    </p>
                )}
            </label>
    
            <div className="submit">
                <button className="button2" type="submit">
                    Register
                </button>
            </div>
            <p className="para1">
                Already have an Account?{" "}
                <a className="link" href="#" onClick={handleLogin}>
                    Login
                </a>
            </p>
        </form>
        </div>
    );
}

export default Register;
