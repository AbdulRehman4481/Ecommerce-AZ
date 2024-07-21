import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthError,
  selectAuthStatus,
} from "../../store/slices/register-slice";
import {
  loginUser,
  selectLoginError,
  selectLoginStatus,
} from "../../store/slices/login-slice";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Username must be 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const LoginRegister = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const loginStatus = useSelector(selectLoginStatus);
  const errorLogin = useSelector(selectLoginError);
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginError, setShowLoginError] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(loginFormData, { abortEarly: false });
      const result = await dispatch(loginUser(loginFormData));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setLoginErrors(errors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(registerFormData, { abortEarly: false });
      dispatch(registerUser(registerFormData));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setRegisterErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (loginStatus === "failed") {
      setShowLoginError(true);
      const timer = setTimeout(() => {
        setShowLoginError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (status === "failed") {
      setShowRegisterError(true);
      const timer = setTimeout(() => {
        setShowRegisterError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const getErrorMessage = (error) => {
    return error && typeof error === "object"
      ? error.message || JSON.stringify(error)
      : error;
  };
  return (
    <Fragment>
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLoginSubmit}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginFormData.email}
                                onChange={handleLoginChange}
                                style={{ marginBottom: 2 }}
                              />
                              {loginErrors.email && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    marginTop: 0,
                                  }}
                                >
                                  {loginErrors.email}
                                </p>
                              )}
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginFormData.password}
                                onChange={handleLoginChange}
                                style={{ marginBottom: 2 }}
                              />
                              {showLoginError && loginStatus === "failed" && (
                                <p style={{ color: "red", marginTop: 0 }}>
                                  {getErrorMessage(errorLogin)}
                                </p>
                              )}
                              {loginErrors.password && (
                                <p style={{ color: "red", fontSize: "13px" }}>
                                  {loginErrors.password}
                                </p>
                              )}
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" required />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button
                                  type="submit"
                                  disabled={loginStatus === "loading"}
                                >
                                  <span>
                                    {loginStatus === "loading"
                                      ? "Logging in..."
                                      : "Login"}
                                  </span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={registerFormData.username}
                                onChange={handleChange}
                                style={{ marginBottom: 2 }}
                              />
                              {registerErrors.name && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    marginTop: 0,
                                  }}
                                >
                                  {registerErrors.name}
                                </p>
                              )}

                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={registerFormData.email}
                                onChange={handleChange}
                                style={{ marginBottom: 2 }}
                              />
                              {registerErrors.email && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    marginTop: 0,
                                  }}
                                >
                                  {registerErrors.email}
                                </p>
                              )}

                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerFormData.password}
                                onChange={handleChange}
                                style={{ marginBottom: 2 }}
                              />
                              {registerErrors.password && (
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    marginTop: 0,
                                  }}
                                >
                                  {registerErrors.password}
                                </p>
                              )}

                              {showRegisterError && status === "failed" && (
                                <p style={{ color: "red" }}>
                                  {getErrorMessage(error)}
                                </p>
                              )}
                              <div className="button-box">
                                <button type="submit">
                                  <span>
                                    {" "}
                                    {status === "loading"
                                      ? "Registering..."
                                      : "Register"}
                                  </span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
