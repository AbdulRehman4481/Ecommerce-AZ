import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectAuthError, selectAuthStatus } from "../../store/slices/register-slice";
import { loginUser, selectLoginError, selectLoginStatus } from "../../store/slices/login-slice";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const loginStatus = useSelector(selectLoginStatus);
  const error = useSelector(selectAuthError);
  const errorLogin = useSelector(selectLoginError);



  // login
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginFormData));
    } catch (error) {
      console.error('Error:', error);
    }
 console.log(loginFormData)
  };

  // register
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(registerFormData));
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  const [showLoginError, setShowLoginError] = useState(false);
const [showRegisterError, setShowRegisterError] = useState(false);
useEffect(() => {
  if (loginStatus === 'failed') {
    setShowLoginError(true);
    const timer = setTimeout(() => {
      setShowLoginError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [loginStatus]);

useEffect(() => {
  if (status === 'failed') {
    setShowRegisterError(true);
    const timer = setTimeout(() => {
      setShowRegisterError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [status]);


  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
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
                                required
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginFormData.password}
                                onChange={handleLoginChange}
                                required
                              
                              />
                             {showLoginError && loginStatus === 'failed' && <p style={{ color: 'red' }}>{errorLogin}</p>}
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" required/>
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>{loginStatus === 'loading' ? 'Logging in...' : 'Login'}</span>
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
                                required
                              
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerFormData.password}
                                onChange={handleChange}
                                required
                              
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={registerFormData.email}
                                onChange={handleChange}
                                required
                              
                              />
                              {showRegisterError && status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
                              <div className="button-box">
                                <button type="submit">
                                  <span> {status === 'loading' ? 'Registering...' : 'Register'}</span>
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
