import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ApplicationCreateForm(props) {

  const jobId = useParams().id;
  const [newApplication, setNewApplication] = useState({})
  const [currentJob, setCurrentJob] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
     gettingJob()
  }, [])
  

  const gettingJob = () => {
    console.log("job id",jobId);
    Axios.get(`/jobs/${jobId}/`)
    .then(res => {
      console.log('job details GET is successful', res);
      setCurrentJob(res.data)
    })
    .catch(err => {
      console.log("Error getting job",err);
    })
  }

  const handleApplication = (event) => {
    const application = {...newApplication}
    application[event.target.name] = event.target.value;
    console.log(application);
    setNewApplication(application)
  }

  const handleFileChange = (e) => {
    // const application = {...newApplication}
    // application[e.target.name] = e.target.files[0]
    // console.log(application);
    // setNewApplication(application)
    console.log(e.target.files[0]);
    setNewApplication({
      ...newApplication,
      resume: e.target.files[0], // Get the first file selected
    });
}

  const addApplication = (application) => {
    // const formData = new FormData();
    // formData.append('resume', application.resume);
    // console.log(formData);
    Axios.post(`/application/${props.user}/create/${jobId}/`, application, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(res => {
      console.log('Job application is successful', res);
    })
    .catch(err => {
      console.log('Error applying for the job', err);
    })
  }

  const submitApplication = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('resume', newApplication.resume);
    addApplication(formData)
    navigate('')
    e.target.reset()
  }

  return (
    <div>
      
      <h2>{currentJob.job_title}</h2>
      <form onSubmit={submitApplication} encType='multipart/form-data'>

      <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='form-label'>Upload your resume</label>
          <input className='form-control' type='file' name='resume' onChange={handleFileChange}></input>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type='submit' className='btn btn-purple btn-sm' value='Save Application'></input>
        </div>
      </form>
    </div>
  )
}
