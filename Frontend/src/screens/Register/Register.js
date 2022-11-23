import React from "react";
import '../LoginSignUp.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { validateName, validateEmail, validatePassword, validateUserName } from "../../validations/validations";

class Register extends React.Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            username: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            errors.fname =
              validateName(values.fname, "First Name") || null;
            errors.lname =
              validateName(values.lname, "Last Name") || null;
            errors.username =
              validateUserName(values.username, "User Name") || null;
            errors.email =
              validateEmail(values.username, "Email") || null;
            errors.password =
              validatePassword(values.password, "password") || null;

            for (var key in errors) {
              if (errors[key] !== null) return errors;
            }
            return true;
          }}

          // After Submitting form
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);

            const userData = {
              "fname": values.fname,
              "lname": values.lname,
              "username": values.username,
              "email": values.email,
              "password": values.password,
            }

            axios.post('http://localhost:4000/auth/signup', userData)
              .then((response) => {
          
                // getting and setting api data into variable
                this.setState({ data : response.data });

                localStorage.setItem(
                  response.data.id,
                  JSON.stringify({
                    fname: values.fname,
                    lname: values.lname,
                    username: values.username,
                    email: values.email,
                  })
                );

                ToastsStore.success("User registered successfully.");
                actions.resetForm();
                  
                }
              )
              .catch(err => {
                ToastsStore.error("Username is already exists.");
                actions.resetForm();
              })
          }}
        >
          {(props) => (
            <div className="log-container">
              <div className="log-main-container">
                <h1 className="Welcome">
                  SignUp Page
                </h1>
                <div className="log-form-container">
                  <form onSubmit={props.handleSubmit}>
                    <div className="input-field">
                      <label className="label">
                        First Name <span className="text-danger">*</span>
                        <span className="errorMsg">
                          {props.errors.fname &&
                            props.touched.fname &&
                            props.errors.fname}
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        name="fname"
                        className="input-box"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fname}
                      />
                    </div>
                    <div className="input-field">
                      <label className="label">
                        Last Name <span className="text-danger">*</span>
                        <span className="errorMsg">
                          {props.errors.lname &&
                            props.touched.lname &&
                            props.errors.lname}
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        name="lname"
                        className="input-box"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lname}
                      />
                    </div>
                    <div className="input-field">
                      <label className="label">
                        User Name <span className="text-danger">*</span>
                        <span className="errorMsg">
                          {props.errors.username &&
                            props.touched.username &&
                            props.errors.username}
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        className="input-box"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.username}
                      />
                    </div>

                    <div className="input-field">
                      <label className="label">
                        Email <span className="text-danger">*</span>
                        <span className="errorMsg">
                          {props.errors.email &&
                            props.touched.email &&
                            props.errors.email}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="input-box"
                        placeholder="Enter your email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                    </div>

                    <div className="input-field">
                      <label className="label">
                        Password <span className="text-danger">*</span>
                        <span className="errorMsg">
                          {props.errors.password &&
                            props.touched.password &&
                            props.errors.password}
                        </span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="input-box"
                        placeholder="Enter Password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                      />
                    </div>
                    <div className="navigation">
                      <label>
                        <p>
                          Already have an account?{" "}
                          <Link className="link" to={"/"}>Sign In</Link>{" "}
                        </p>
                      </label>
                    </div>
                    <div className="form-button">
                      <button
                        type="submit"
                        name="signupsubmit"
                        value="Sign Up"
                        className="btn-submit"
                      >Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Formik>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
      </div>
    );
  }
}

export default Register;
