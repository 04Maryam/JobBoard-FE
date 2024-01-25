import Axios from 'axios'
import React, { useEffect, useState } from 'react';
// import logo from '../public/images/SLogo.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import { jwtDecode } from "jwt-decode";
import Home from './components/home/Home';
import { Routes, Route, Link, useNavigate, Router } from "react-router-dom";
import About from './components/about/About';
import Signup from "./components/authentication/Signup";
import JobCategoryList from './components/jobCategory/JobCategoryList';
import SkillsList from './components/skills/SkillsList';
import CompanyList from './components/company/CompanyList';
import JobList from './components/job/JobList';
import Login from "./components/authentication/Login";
import CompanyCreateForm from './components/company/CompanyCreateForm';
import ApplicationList from './components/application/ApplicationList';
import ApplicationCreateForm from './components/application/ApplicationCreateForm';
import JobsByCompany from './components/job/JobsByCompany';
import ApplicationByJob from './components/application/ApplicationByJob';


function App() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState();
  const [userInfo,setUserInfo]=useState({})
  const [userProfileInfo, setUserProfileInfo] = useState({})
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    //const user = setUser();
    const user = getUser();
    console.log("INIT USER",user);
    if (user) {
      setIsAuth(true);
      setUser(user);
      if(user != 1){
        getUserInfo(user)
        getUserRole(user)
      }
      // getUserRole(user)
      // setUserInfo(user.id)
      // showUser(user.id)
    }
    else {
      logout()
    }
    getUserRole()
   
  }, []);

  const registerHandler = (user) => {
    Axios.post("/signup/", user)
      .then((res) => {
        console.log(res);
        console.log("Register Success");
      })
      .catch((err) => {
        console.log(err);
        console.log("Register Not Success");
      });
  };

  

  const handleLogin = (newLogin) => {
    Axios.post('/login/', newLogin)
    .then(res => {
        console.log('successfully logged in', res.data);
        const access_token = res.data.access_token
        const refresh_token = res.data.refresh_token
        console.log('access token', access_token);
        console.log('refresh token', refresh_token);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        const user = jwtDecode(access_token).user_id;
        console.log("user",user);
        if (user) {
          setIsAuth(true)
          setUser(user);
        }
        else {
          setIsAuth(false);
          setUser(null);
        }
        // user ? showUser(user.id) : showUser(null);
        console.log('Login Success');
        // navigate("/");
    })
    .catch(err => {
        console.log('error logging in', err.response);
    })
  }

  const getUserInfo = (user) => {
    console.log(user);
    Axios.get(`user/${user}/info/`, {
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("access_token")
    }
    })
    .then(res => {
      console.log("user info loaded", res);
      setUserInfo(res.data.user_info)
      setUserProfileInfo(res.data.profile_info)
    })
    .catch(err => {
      console.log("error getting user info", err);
    })
  }

  const getUserRole = (user) => {
    // console.log(user);
    Axios.get('user/role/', {
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("access_token")
    }
    })
    .then(res => {
      console.log('user role', res);
      setUserRole(res.data)
    })
    .catch(err => {
      console.log('error getting user role', err);
    })
  }


  // const loginHandler = (cred) => {
  //   Axios.post("/login/", cred)
  //     .then((res) => {
  //       console.log(res.data.token);
  //       //Makes sure the token is Valid
  //       let token = res.data.token;
  //       if (token != null) {
  //         localStorage.setItem("access_token", token);
  //         const user = getUser();
  //         console.log(user);
  //         user ? setIsAuth(true) : setIsAuth(false);
  //         user ? setUser(user) : setUser(null);
  //         user ? showUser(user.id) : showUser(null)
  //         console.log("Login Success");
  //         // user ? setUserInfo(user.id) : setUserInfo(null)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const logout = () => {
    setIsAuth(false);
    setUser({});
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // navigate('/login');
    console.log('Logout Success');
    console.log("INIT USER",user);
  }


  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user_id : null;
  };

  const getToken = () => {
    const token = localStorage.getItem("access_token");
    return token;
  };

  const handleLogout = () => {
    Axios.post('/logout/')
      .then((response) => {
        console.log('Have Successfully Logged out:', response.data);
        
      })
      .catch((error) => {
        console.error('Error logging out:', error.response);
      });
  };

  // const showUser = (id) =>{
  //   Axios.get(`/user/detail?id=${id}`)
  //   .then((response) => {
  //     console.log(response)
  //     let user = response.data.user
  //     setCurrentUser(user)
  //     setUserInfo(user)
  // })
  // .catch((err) => {
  //     console.log(err)
  // })
  // }
  const setHeaders =() =>{
    return {headers:{Authorization:`Bearer ${getToken()}`}}
  }
  return (
    <>
      <div className="App">
        <header className="purple-header">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              >
              <img src='/images/SLogo.svg' width='100px'/>
            </a>

              <ul className="nav pe-2 col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="nav-link px-2 text-white">
                    About
                  </a>
                </li>
                {isAuth ? (
                  <>
                <li>
                  <Link to="/jobs/" className="nav-link px-2 text-white">
                    {" "}
                    Browse Category
                  </Link>
                </li>
                <li>
                  <Link to="/company/" className="nav-link px-2 text-white">
                    {" "}
                    Companies
                  </Link>
                </li>
                </>
                ):(
                  <li>
                  <a href="/jobs/" className="nav-link px-2 text-white">
                    Browse Category
                  </a>
                </li>
               
                )
              }
              </ul>

              <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <input
                  type="search"
                  className="form-control form-control-dark"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>

              <div className="text-end">
                {isAuth ? (
                  <button type="button" onClick={logout} className="btn btn-outline-light me-2">
                  Logout
                </button>
                ):(
                  <>
                <Link to="/login/">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className="btn btn-warning text-black">
                    Sign-up
                  </button>
                </Link>
                </>
                )
                }
                  
              </div>
            </div>
          </div>
        </header>
      </div>
      
      <main>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About/>} />
          <Route path='/skills' element={<SkillsList role={userRole} />} />
          <Route path='/company/' element={<CompanyList role={userRole}/>} />
          <Route path="/jobs" element={<JobList role={userRole} user={user}/>}/>
           <Route path="/company/create" element={<CompanyCreateForm role={userRole}/>} />  
           <Route path='/application/' element={isAuth ? (<ApplicationList role={userRole} />) : <Login login={handleLogin} />}/>                      
          <Route path="/signup" element={isAuth ? (<Home /> ) : (<Signup register={registerHandler} /> )} />
          <Route path="/login/" element={isAuth ? (<Home/> ): <Login login={handleLogin} />} />
          <Route path='/logout' element={<Login/>}/>
          <Route path='/job_category' element={<JobCategoryList role={userRole} />}/>
          <Route path='/application/:id' element={<ApplicationCreateForm role={userRole} user={user} />} />
          <Route path='/job/compnany/:id' element={<JobsByCompany role={userRole} user={user} /> } />
          <Route path='/job/applications/:id' element={<ApplicationByJob role={userRole} user={user} />} />
        </Routes>
      </main>

      <footer className="px-3 py-2  purple-header  footerbottom">
        <div className="container">
          <p className="mb-1 text-white text-center font">
            &copy; 2024 | SkillSail{" "}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
