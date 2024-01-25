import React from 'react'

export default function Application(props) {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = props.resume; // Assuming props.resume contains the URL to the resume file
    console.log(link.href);
    link.download = 'resume.pdf'; // You can set the desired file name
    link.click();
  };
  let status = ''
  if(props.application_status == 'S'){
    status = 'Submitted'
  }else{
    if(props.application_status == 'R'){
      status = 'Rejected'
    }else{
      status = 'Accepted'
    }
  }

  return (
    <div className="card h-100">
        <div class="card-header">
            {props.application_date}
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.job}</h5>
            <p className="card-text">Status: {status}</p>
            <a href="#" onClick={downloadResume}>
          Download Resume
        </a>
        </div>
        <div className='card-footer'>
            <button className='btn btn-purple btn-sm' onClick={() => {props.edit(props)}}>Edit Resume</button>
        </div>
    </div>
  )
}