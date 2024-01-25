import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Job from './Job';
import JobCreateForm from './JobCreateForm';
import JobEditForm from './JobEditForm';
import {  Link } from "react-router-dom";

export default function JobList() {
    const [job, setJob] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isAdd, setIsAdd] = useState(false);
    const [currentJob, setCurrentJob] = useState({})
  
    const setHeaders = () => {
      return{
          headers: {
              // Authorization:'Bearer '+ localStorage.getItem("access_token")
              Authorization:'Bearer '+ localStorage.getItem("access_token")
          }
      };
  }

    useEffect(() => {
      loadJobList();
    }, []);
  
    const handleClick = () => {
      setIsAdd(!isAdd)
  }
  
      const loadJobList = () => {
          Axios.get('/jobs/')
            .then(response => {
              console.log('Job List Loaded');
              console.log(response.data);
              setJob(response.data);
            })
            .catch(error => {
              console.log('Job List not Loaded');
              console.log(error);
            });
      }
      

      const addJob = (job) => {
        console.log('Adding job:', job);
        Axios.post(`/jobs/create/?category_id=${job.job_category}&company_id=${job.company}`, job, setHeaders())
        .then(res =>{
          console.log('Job has been Added',res) 
          loadJobList()
        })
        .catch(err => {
          console.log('Job cannot be Added')
          console.log(err) 
        })
      }
  
  
    // const editView = (id) => {
    //   Axios.get(`/category/edit?id=${id}`)
    //   .then ((res) => {
    //       console.log(res.data.category);
    //       console.log("Loaded Category Information");
    //       let category = res.data.category;
    //       setIsEdit(true)
    //       setCurrentJobCategory(category);
    //   })
    //     .catch (err => {
    //     console.log("Error Adding Category");
    //     console.log(err);
    //   })
    // }
  
    const deleteJob = (id) => {
      Axios.delete(`/jobs/${id}/delete/`, setHeaders())
      .then(res => {
          console.log("Record deleted Successfullyyy !!");
          console.log(res);
          loadJobList();
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
          console.log("Category Updated Successfullyyy !!", res);
          console.log(res);
          setIsEdit(false);
          loadJobList();
          
      })
      .catch(err => {
          console.log("Error Updating Job");
          console.log(err);
      })  
  }
  
        const allTheJobCategories = job.map((job , index) => (
  
          <tr key={index}>  
         
            <Job {...job} deleteJob= {deleteJob} editJob={editJob}/>
          </tr>
        ))
  
    return (
      <div>
        <div>
          <h1 className='font mt-3 text-center'>Browse Jobs</h1>
          <Link to="/job/create/"><button className='btn btn-purple btn-sm' onClick={handleClick}>Add Job</button></Link>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Category</th>
                <th>Job Title</th>
                <th> Job Description</th>
                <th>Salary</th>
                <th>Skills</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
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
    )
}
