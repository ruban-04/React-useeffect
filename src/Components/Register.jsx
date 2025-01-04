import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import images from './images/img1.jpg'

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Initial values
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  };

  // Validation Schema
  const validationSchema = Yup.object({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required('Confirm Password is required'),
  
  });

  // Form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        'https://672863f4270bd0b975553389.mockapi.io/cruddata/RegisterForm',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert('Registration successful!');
        resetForm();
        navigate('/Datastorage');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {() => (
        <div  style={{display:'flex', padding:'30px 19rem',backgroundColor: 'rgb(43, 43, 43)',paddingBottom:'5.1rem', }}>

            <img className='image' src={images} style={{width:'370px',borderRadius:'5px',boxShadow:' rgba(60, 66, 87, 0.12) 0px 0px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px'}}></img>

        <Form className="form2" style={{ width: '400px' }}>
          <h1 className="head1">Register Here</h1>

          <div style={{ display: 'flex' }}>

            <div className="label1 mt-3" style={{ width: '100%' }}>
              <label>Firstname</label>
              <Field className="box2" name="firstname"  style={{ width: '86%' }} />
              <ErrorMessage name="firstname" component="span" className="error" />
            </div>

            <div className="label1 mt-3" style={{ width: '100%' }}>
              <label>Lastname</label>
              <Field className="box2" name="lastname"  style={{ width: '89%' }} />
              <ErrorMessage name="lastname" component="span" className="error" />
            </div>
          </div>

          <div className="label2" style={{ width: '100%' }}>
            <label>Email</label>
            <Field className="box3" name="email" style={{ width: '95%' }} />
            <ErrorMessage name="email" component="span" className="error" />
          </div>

          <div className="label2" style={{ width: '100%' }}>
            <label>Mobile Number</label>
            <Field
              className="box3"
              name="mobile"
              type="text"
              style={{ width: '95%' }}
            />
            <ErrorMessage name="mobile" component="span" className="error" />
          </div>

            <div className="label1" style={{ width: '100%' }}>
              <label>Password</label>
              <div style={{ display: 'flex', position: 'relative' }}>
                <Field
                  className="box2"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  style={{ width: '100%' }}
                />
                <span
                  className="eye-icon "
                  style={{ position: 'absolute', right: '10px', top: '9px', cursor: 'pointer',fontSize:'15px',color:'gray' }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                </span>
              </div>
              <ErrorMessage name="password" component="span" className="error" />
            </div>
            
            <div className="label1" style={{ width: '100%' }}>
              <label>Confirm Password</label>
              <div style={{ display: 'flex', position: 'relative' }}>
                <Field
                  className="box2"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                 
                  style={{ width: '100%' }}
                />
                <span
                  className="eye-icon"
                  style={{ position: 'absolute', right: '10px', top: '9px', cursor: 'pointer',fontSize:'15px',color:'gray' }}
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="span" className="error" />
            </div>
        
          <button className="button2" type="submit" style={{ width: '100%' }}>
            Register
          </button>
          <p className="para2">
            Already have an Account?
            <a href="" onClick={() => navigate('/Datastorage')} className="link">
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

