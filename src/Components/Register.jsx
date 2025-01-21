
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import images from "./images/img1.jpg";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;

  const initialValues = {
    firstname: rowData?.firstname || "",
    lastname: rowData?.lastname || "",
    email: rowData?.email || "",
    mobile: rowData?.mobile || "",
    password: rowData?.password || "",
    confirmpassword: rowData?.confirmpassword || "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = rowData ? "PUT" : "POST";
      const url = rowData
        ? `https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm/${rowData.id}`
        : "https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        resetForm();
        navigate("/Datastorage");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(43, 43, 43)",
            height: "100vh",
          }}
        >
          <img
            className="image"
            src={images}
            alt="Register"
            style={{
              width: "400px",
              borderRadius: "5px",
              boxShadow:
                "rgba(60, 66, 87, 0.12) 0px 0px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px",
                height:'74%'
            }}
          />
          <Form className="form2" style={{ width: "400px", overflowY: "auto" }}>
            <h1 className="head1" style={{ textAlign: "center", color: "white" }}>
              {rowData ? "Edit Form" : "Register Here"}
            </h1>

            {[ 
              { name: "firstname", label: "Firstname", type: "text", placeholder: "Firstname" },
              { name: "lastname", label: "Lastname", type: "text", placeholder: "Lastname" },
              { name: "email", label: "Email", type: "email", placeholder: "Email" },
              { name: "mobile", label: "Mobile Number", type: "text", placeholder: "Mobile Number" },
            ].map((field) => (
              <div className="label1" key={field.name} style={{ width: "100%", marginBottom: "15px" }}>
                <label style={{ color: "white" }}>{field.label}</label>
                <Field
                  className="box2"
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{ width: "94%" }}
                />
                <ErrorMessage name={field.name} component="div" className="error" />
              </div>
            ))}

             
            {[ 
              { name: "password", label: "Password", visible: passwordVisible, setVisible: setPasswordVisible },
              { name: "confirmpassword", label: "Confirm Password", visible: confirmPasswordVisible, setVisible: setConfirmPasswordVisible },
            ].map((field) => (
              <div className="label1" key={field.name} style={{ width: "100%", marginBottom: "15px" }}>
                <label style={{ color: "white" }}>{field.label}</label>
                <div style={{ display: "flex", position: "relative" }}>
                  <Field
                    className="box2"
                    name={field.name}
                    type={field.visible ? "text" : "password"}
                    placeholder={field.label}
                    style={{ width: "94%" }}
                  />
                  <span
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "4px",
                      cursor: "pointer",
                      fontSize: "15px",
                      color: "gray",
                    }}
                    onClick={() => field.setVisible(!field.visible)}
                  >
                    {field.visible ? (
                      <i className="fas fa-eye" style={{marginTop:'9px'}}></i>
                    ) : (
                      <i className="fas fa-eye-slash" style={{marginTop:'9px'}}></i>
                    )}
                  </span>
                </div>
                <ErrorMessage name={field.name} component="div" className="error" />
              </div>
            ))}

            <div style={{ margin: "15px 0" }}>
              <label style={{ color: "white" }}>
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  style={{ marginRight: "10px" }}
                />
                I accept the terms and conditions
              </label>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="error"
              />
            </div>

            <button className="button2" type="submit" style={{ width: "100%" }}>
              {rowData ? "Update" : "Register"}
            </button>

            <p className="para2" style={{ marginTop: "10px", textAlign: "center" }}>
              Already have an Account?{" "}
              <a
                href="#"
                onClick={() => navigate("/Datastorage")}
                className="link"
                style={{ color: "skyblue" }}
              >
                Login
              </a>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Register;
