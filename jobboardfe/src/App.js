
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import Home from './components/home/Home';
import { Routes, Route, Link } from "react-router-dom";
import About from './components/about/About';
import Signup from "./components/authentication/Signup";
import JobCategoryList from './components/jobCategory/JobCategoryList';
import SkillsList from './components/skills/SkillsList';
import CompanyList from './components/company/CompanyList';
import JobList from './components/job/JobList';
import Login from "./components/authentication/Login";


function App() {
  
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userInfo,setUserInfo]=useState()





  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setUserInfo(null);
  };

  return (
    <>
      <div className="App">
        <header className="p-3 purple-header">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              ></a>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
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
                <li>
                  <Link to="/jobs/" className="nav-link px-2 text-white">
                    {" "}
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <a href="#" className="nav-link px-2 text-white">
                    Create Company
                  </a>
                </li>
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
              </div>
            </div>
          </div>
        </header>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About/>} />
          <Route path='/skills' element={<SkillsList/>} />
          <Route path='/companies' element={<CompanyList />} />
          <Route path="/jobs/" element={<JobList/>}/>
                                  
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/login/" element={<Login></Login>} />
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
