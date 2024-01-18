import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import About from './components/about/About'
import JobCategoryList from './components/jobCategory/JobCategoryList';


function App() {
  return (
    <>
    <div className="App">
     <header className="p-3 purple-header">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" className="nav-link px-2 text-white">Home</a></li>
          <li><a href="/about" className="nav-link px-2 text-white">About</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Browse Jobs</a></li>
          <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" className="nav-link px-2 text-white">About</a></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
        </form>

        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2">Login</button>
          <button type="button" className="btn btn-warning">Sign-up</button>
        </div>
      </div>
      <Home/>
      <JobCategoryList/>
    </div>
  </header>
    </div>

    <Routes>
    <Route path="/" element={<Home></Home>} />
    <Route path="/about" element={<About></About>} />
    </Routes>
    </>
  );
}

export default App;
