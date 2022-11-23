import React, { useState } from "react";
import "../LoginSignUp.css";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  validatePassword,
  validateUserName,
} from "../../validations/validations";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [submit, setSubmit] = useState(false);
  let navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          errors.username =
            validateUserName(values.username, "Username") || null;
          errors.password = validatePassword(values.password) || null;

          for (var key in errors) {
            if (errors[key] !== null) return errors;
          }
          return true;
        }}
        // After Submitting the form
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);

          const userData = {
            username: values.username,
            password: values.password,
          };

          axios
            .post("http://localhost:4000/auth/login", userData)
            .then((response) => {
              // getting and setting api data into variable

              localStorage.setItem(
                response.data.id,
                JSON.stringify({
                  fname: response.data.fname,
                  lname: response.data.lname,
                  username: response.data.username,
                  email: response.data.email,
                })
              );
              localStorage.setItem("username", response.data.username);
              localStorage.setItem("id", response.data.id);
              ToastsStore.success("User Login successfully.");
              actions.resetForm();
              navigate("../todo", { replace: true });
            })
            .catch((err) => {
              console.log(err);
              ToastsStore.error("Invalid Username/Password.");
              actions.resetForm();
            });
        }}
      >
        {(props) => (
          <div className="log-container">
            <div className="log-main-container">
              <h1 className="Welcome">Login Page</h1>
              <div className="form-container">
                <form onSubmit={props.handleSubmit}>
                  <div className="input-fields">
                    <label className="label">
                      Username <span className="text-danger">*</span>
                      <span className="errorMsg">
                        {props.errors.username &&
                          props.touched.username &&
                          props.errors.username}
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      placeholder="Enter Username"
                      name="username"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.username}
                    />
                  </div>
                  <div className="input-fields">
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
                      className="input-box"
                      placeholder="Enter Password"
                      name="password"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                    />
                  </div>
                  <div className="navigation">
                    <label>
                      <p>
                        Do not have an account?{" "}
                        <Link className="link" to={"/register"}>
                          Sign Up
                        </Link>{" "}
                      </p>
                    </label>
                  </div>
                  <div className="form-button">
                    <button type="submit" name="submit" className="btn-submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.TOP_RIGHT}
            />
          </div>
        )}
      </Formik>
    </div>
  );
};
export default LogIn;
