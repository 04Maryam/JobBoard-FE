import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Home() {
  
  return (
    <>
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light home-img">
    <div className="col-md-5 p-lg-5 mx-auto my-5">
      <h1 className="display-4 fw-normal font">Welcome</h1>
      <p className="lead fw-normal font">SkillSail's Job Board</p>
    </div>
    <button type="button"  className="btn btn-outline-dark"><Link  to='/jobs' style={{color: 'inherit', textDecoration: 'inherit'}}>Apply</Link></button>
    <div className="product-device shadow-sm d-none d-md-block"></div>
    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
  </div>

    {/* <div>
      <div class="home">
          <img src='./images/job-search.jpg' alt='' className="bd-placeholder-img home-img" ></img>
        <div class="container">
        <div class="bg-text">
          <p>Welcome</p>
          <button type="button" class="btn  btn-outline-dark">Apply</button>

          </div>
            
        </div>
      </div>
    </div> */}
    </>
  );
}