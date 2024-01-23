import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Job from './Job';
import JobCreateForm from './JobCreateForm';
import JobEditForm from './JobEditForm';

export default function JobList() {
    const [job, setJob] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [currentJob, setCurrentJob] = useState({})
  
    const setHeaders = () => {
      const authHeader = {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem("token")
        }
      }
      return authHeader;
    }

    useEffect(() => {
      loadJobList();
    }, []);
  
  
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
        Axios.post("/jobs/create/", job)
        .then(res =>{
          console.log('Job has been Added') 
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
      Axios.delete(`/jobs/${id}/delete/`)
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
  
  
    const updateJob= (job) => {
      Axios.put(`/jobs/id=${currentJob.id}/update/`, job)
      .then(res => {
          console.log("Category Updated Successfullyyy !!");
          console.log(res);
          loadJobList();
          setIsEdit(false);
          
      })
      .catch(err => {
          console.log("Error Updating Job");
          console.log(err);
      })  
  }
  
        const allTheJobCategories = job.map((job , index) => (
  
          <tr key={index}>  
         
            <Job {...job} deleteJobCategory = {deleteJob}/>
          </tr>
        ))
  
    return (
      <div>
        <div>
          <h1>Job Category List</h1>
          <table>
            <thead>
                <th>Company</th>
                <th>Job Category</th>
                <th>Job Title</th>
                <th> Job Description</th>
                <th>Salary</th>
                <th>Skills</th>
            </thead>
            <tbody>
                {allTheJobCategories}
            </tbody>
          </table>
        </div>
  
        {(!isEdit) ?
        <JobCreateForm addJob={addJob}/>
          :
          <JobEditForm key={currentJob.id} category={currentJob} updateJobCategory={updateJob} />
        }
        {/* <JobCategoryCreateForm addJobCategory = {addJobCategory}/> */}
      </div>
    )
}
