import React from 'react'

export default function About() {
  return (
<>

<div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary aboutBg">
    <div className="col-lg-6 px-0">
      <h1 className="display-5 fst-italic font">Unlock Your Potential. Create Your Own Opportunities</h1>
    </div>
  </div>
 
  <div className="px-4 my-3 text-center border-bottom">
    <h6 className="display-4 fw-bold text-body-emphasis">Why Choose SkillSail?</h6>
    <div className="col-lg-7 mx-auto">
      <p className="display-20 lead mb-4">Central platform connecting employers with job openings to job seekers. By consolidating job listings from diverse companies and industries, it simplifies the process for job seekers to find relevant opportunities that align with their career goals, effectively streamlining the connection between job seekers and the right job opportunities.</p>
    </div>
  </div>

{/* <div className='container marketing mt-4'> 
<div className="row mx-auto">
      <div className="col-lg-4">
        <img src='AboutPage1.jpg' alt='' className="bd-placeholder-img rounded-circle" width="140" height="140"></img>
        <h4 className="fw-normal">Maryam Mohamed</h4>
        <p className='display-15'>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><div className="btn btn-secondary btn-sm">Admin »</div></p>
      </div>
    
     
      <div className="col-lg-4">
        <img src='AboutPage1.jpg' alt='' className="bd-placeholder-img rounded-circle" width="140" height="140"></img>
        <h4 className="fw-normal">Kawthar Mahfoodh</h4>
        <p className='display-15'>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><div className="btn btn-secondary btn-sm">Admin »</div></p>
      </div>
  

    
      <div className="col-lg-4">
        <img src='AboutPage1.jpg' alt='' className="bd-placeholder-img rounded-circle" width="140" height="140"></img>
        <h4 className="fw-normal">Marwa AlKhashram</h4>
        <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p className='display-15'><div className="btn btn-secondary btn-sm">Admin »</div></p>
      </div>
  

    
      <div className="col-lg-4 ">
        <img src='AboutPage1.jpg' alt='' className="bd-placeholder-img rounded-circle" width="140" height="140"></img>
        <h4 className="fw-normal">Samia Jamal</h4>
        <p className='display-15'>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><div className="btn btn-secondary btn-sm">Admin »</div></p>
      </div>
    

 
    <div className="col-lg-4">
        <img src='AboutPage1.jpg' alt='' className="bd-placeholder-img rounded-circle" width="140" height="140"></img>
        <h4 className="fw-normal">Sara Nedhal</h4>
        <p className='display-15'>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><div className="btn btn-secondary btn-sm">Admin »</div></p>
      </div>
     </div>
</div> */}
 <h6 className="text-body-emphasis text-center classic-font mb-5">Meet the Team</h6>
<div id="carouselExampleIntervel" className="carousel slide my-3" data-bs-ride="carousel">
  <div className="carousel-inner" data-bs-intervel='1'>
<div className="carousel-item active text-center">
<div className='row'>
<div className="col-lg-4">
   
        <h4 className="fw-normal">Maryam Mohamed</h4>
        <p className='display-14'>Founder</p>
        <div className="btn btn-secondary btn-sm">Admin »</div>
</div>

<div className="col-lg-4">
    
        <h4 className="fw-normal">Kawthar Mahfoodh</h4>
        <p className='display-15'>Founder</p>
        <div className="btn btn-secondary btn-sm">Admin »</div>
    </div>
  
    
    <div className="col-lg-4">
  
        <h4 className="fw-normal">Marwa AlKhashram</h4>
        <p className='display-15'>Founder</p>
        <div className="btn btn-secondary btn-sm">Admin »</div>
    </div>
    </div>
    </div>
  

    <div className="carousel-item text-center" data-bs-intervel='1'>
    <div className='row'>
    <div className="col-lg-4">
    
        <h4 className="fw-normal">Samia Jamal</h4>
        <p className='display-15'>Founder</p>
        <div className="btn btn-secondary btn-sm">Admin »</div>
    </div>

    <div className="col-lg-4">
  
        <h4 className="fw-normal">Sara Nedhal</h4>
        <p className='display-15'>Founder</p>
        <div className="btn btn-secondary btn-sm">Admin »</div>
    </div>

  </div>
  </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIntervel" data-bs-slide="prev">
    <div className="carousel-control-prev-icon" aria-hidden="true"  style={{ filter: 'brightness(50%)' }}></div>
    <div className="visually-hidden">Previous</div>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIntervel" data-bs-slide="next">
    <div className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'brightness(50%)' }}></div>
    <div className="visually-hidden">Next</div>
  </button>
  </div>





</>

  )
}
