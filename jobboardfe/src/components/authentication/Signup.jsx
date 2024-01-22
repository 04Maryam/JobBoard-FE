import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      axios
        .post('/api/signup/', {
          username,
          password,
          email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          image,
        })
        .then((response) => {
            console.log(response)
          const { access_token, refresh_token } = response.data;
          // Store the tokens in local storage or perform other actions
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          // Redirect to a new page or update the UI accordingly
        })
        .catch((error) => {
          setError('Failed to register. Please try again.');
          console.log(error);
        });
    };

    return (
        <>
   
  <div className="container">
    <div className="row d-flex justify-content-center align-items-center" style={{ padding: '10px' }}>
      <div className="col-lg-10 col-11" >
        <div className="card text-black" style={{ borderRadius: '25px' , borderWidth: '2px'}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-2" style={{ opacity: 0.8 }}>Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleFormSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="username">Username</label>
                      <input type="text" id="username" className="form-control" value={username} onChange={(event)=> setUsername(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="email">Your Email</label>
                      <input type="email" id="email" className="form-control" value={email} onChange={(event)=> setEmail(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" className="form-control" value={firstName} onChange={(event)=> setFirstName(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" className="form-control" value={lastName} onChange={(event)=> setLastName(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                      <input type="text" id="phoneNumber" className="form-control" value={phoneNumber} onChange={(event)=> setPhoneNumber(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control" value={password} onChange={(event)=> setPassword(event.target.value)} />
                    </div>
                  </div>

                  
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="image">Avatar</label>
                      <input type="file" accept=".png, .jpg, .jpeg" id="image" className="form-control" value={image} onChange={(event)=> setImage(event.target.value)} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
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


        {/* <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          {/* <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div> */}
          {/* <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          <button type="submit">Submit</button>

            </form> */}
          {/* </div> */} 

          </>
    )
}
