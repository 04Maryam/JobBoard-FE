import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Job from './Job';
import JobCreateForm from './JobCreateForm';
import JobEditForm from './JobEditForm';

export default function JobsByCompany(props) {

    const companyId = useParams().id
    const [jobs, setJobs] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [currentJob, setCurrentJob] = useState({})
    const navigate = useNavigate()

    const setHeaders = () => {
        return{
            headers: {
                // Authorization:'Bearer '+ localStorage.getItem("access_token")
                Authorization:'Bearer '+ localStorage.getItem("access_token")
            }
        };
    }

    useEffect(() => {
      gettingJobs()
    }, [])

    const handleClick = () => {
        setIsAdd(!isAdd)
    }
    

    const gettingJobs = () => {
        console.log('company id', companyId);
        Axios.get(`/company/browse/jobs/?id=${companyId}`, {
            headers: {
                Authorization:'Bearer '+ localStorage.getItem("access_token")
            }
        })
        .then(res => {
            console.log('getting job list is successful', res);
            setJobs(res.data.jobs)
        })
        .catch(err => {
            console.log('error getting jobs for the company', err);
        })
    }

    const addJob = (job) => {
        console.log('Adding job:', job);
        Axios.post(`/jobs/create/?category_id=${job.job_category}&company_id=${job.company}`, job, setHeaders())
        .then(res =>{
          console.log('Job has been Added',res) 
          gettingJobs()
        })
        .catch(err => {
          console.log('Job cannot be Added')
          console.log(err) 
        })
      }

      const deleteJob = (id) => {
        Axios.delete(`/jobs/${id}/delete/`, setHeaders())
        .then(res => {
            console.log("Record deleted Successfullyyy !!");
            console.log(res);
            gettingJobs();
        })
        .catch(err => {
            console.log("Error deleting Job");
            console.log(err);
        })  
      }
    
      const editJob = (job) => {
        setCurrentJob(job)
        console.log(job);
        setIsEdit(true)
    }
    
      const updateJob= (job) => {
        Axios.post(`/jobs/update/?category_id=${job.job_category}&job_id=${currentJob.id}`, job, setHeaders())
        .then(res => {
            console.log("Job Updated Successfullyyy !!", res);
            console.log(res);
            setIsEdit(false);
            gettingJobs();
            
        })
        .catch(err => {
            console.log("Error Updating Job");
            console.log(err);
        })  
    }
  
        const jobApply = (id) => {
          navigate(`/application/${id}`)
        }

        const viewApplications = (id) => {
            navigate(`/job/applications/${id}`)
        }

    const allTheJobCategories = jobs.map((job , index) => (
  
        <tr key={index}>  
       
          <Job {...job} role={props.role} deleteJob= {deleteJob} editJob={editJob} apply={jobApply} viewApplications={viewApplications} userId={props.user} />
        </tr>
      ))

  return (
    <div>
        <div>
        <div> 
          <div className='text-center'>
          <h1> Job List</h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'}}><button className='btn btn-purple btn-sm mb-3' onClick={handleClick}>Add Job</button></div>
          <table className='mx-auto'>
            {/* <thead>
              <tr>
                <th>Company</th>
                <th>Job Category</th>
                <th>Job Title</th>
                <th> Job Description</th>
                <th>Salary</th>
                <th>Skills</th>
                {(props.user == jobs.user)?
                (<>
                <th>Edit</th>
                <th>Delete</th>
                </>) : null}
              </tr>
            </thead> */}
            <tbody>
                {allTheJobCategories}
            </tbody>
          </table>
        </div>
  
        {isAdd &&
        <JobCreateForm addJob={addJob}/>
        }
        {isEdit &&
          <JobEditForm currentJob={currentJob} updateJob={updateJob} setCurrentJob={setCurrentJob}/>
        }
        {/* <JobCategoryCreateForm addJobCategory = {addJobCategory}/> */}
      </div>
    </div>
  )
}
