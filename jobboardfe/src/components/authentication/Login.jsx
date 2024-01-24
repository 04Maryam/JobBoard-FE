import React, { useState } from 'react';
import Axios from 'axios';

export default function Login (props) {

    const [loginData, setLoginData] = useState({});
    
      const handleChange = (e) => {
        const login = {...loginData}
        login[e.target.name] = e.target.value
        console.log(login);
        setLoginData(login)
      };
    
    //   const handleLogin = async () => {
    //     try {
    //       const response = await Axios.post('http://localhost:8000/api/login/', loginData);
    //       const { access_token, refresh_token } = response.data;
    
    //       // Store tokens in local storage
    //       localStorage.setItem('access_token', access_token);
    //       localStorage.setItem('refresh_token', refresh_token);
    
    //       // Optionally, you can redirect the user to a different page after login
    //       // history.push('/dashboard');
    //     } catch (error) {
    //       console.error('Error logging in:', error);
    //     }
    //   };

    //   const handleLogin = (newLogin) => {
    //     Axios.post('/login/', newLogin)
    //     .then(res => {
    //         console.log('successfully logged in', res.data);
    //         const access_token = res.data.access_token
    //         const refresh_token = res.data.refresh_token
    //         console.log('access token', access_token);
    //         console.log('refresh token', refresh_token);
    //         localStorage.setItem('access_token', access_token);
    //         localStorage.setItem('refresh_token', refresh_token);
    //     })
    //     .catch(err => {
    //         console.log('error logging in', err.response);
    //     })
    //   }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        props.login(loginData);
        e.target.reset();
      };
          return (
            <div className="container">
            <div className="row d-flex justify-content-center align-items-center" style={{ padding: '10px' }}>
              <div className="col-lg-10 col-11" >
                <div className="card text-black" style={{ borderRadius: '25px' , borderWidth: '2px'}}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        
                        <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-2" style={{ opacity: 0.8 }}>Login</p>
        
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
        
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="username">Username</label>
                              <input type="text" name='username' id="username" className="form-control"  onChange={handleChange} />
                            </div>
                          </div>
        
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password">Password</label>
                              <input type="password" name='password' id="password" className="form-control" onChange={handleChange} />
                            </div>
                          </div>
        
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                          </div>
        
                        </form>
        
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
        
                        <img src='/images/signupimg.jpg' className="img-fluid" alt="Sample image" />
        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          );
        };
        
        

