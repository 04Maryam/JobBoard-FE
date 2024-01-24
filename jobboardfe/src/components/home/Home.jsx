import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Home() {


  return (
    <>
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light home-img">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <h1 class="display-4 fw-normal">Welcome</h1>
      <p class="lead fw-normal">Job Board.</p>
    </div>
    <button type="button"  class="btn btn-outline-dark"><Link  to='/jobs' style={{color: 'inherit', textDecoration: 'inherit'}}>Apply</Link></button>
    <div class="product-device shadow-sm d-none d-md-block"></div>
    <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
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