import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate  , useParams} from 'react-router-dom'
import Axios from 'axios';


export default function JobsByCategory(props) {
  const [jobsByCategory , setJobsByCategory] = useState([])
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState([])
  
  const navigate = useNavigate()
  const categoryId = useParams().id

  useEffect(() => {
    get_jobs_by_category()
    // loadCompany()
    // loadJobCategory()
    // loadJobSkills()
  }, [])
  
  const setHeaders = () => {
    return{
        headers: {
            // Authorization:'Bearer '+ localStorage.getItem("access_token")
            Authorization:'Bearer '+ localStorage.getItem("access_token")
        }
    };
}

    const get_jobs_by_category = (jobs) => {
    Axios.get(`/job_categories/browse/jobs/?category_id=${categoryId}`)
    .then(res =>{
      console.log("fetch the jobs by categories successfully");
      console.log(res.data);
      setJobsByCategory(res.data);
    })
    .catch(error=>{
      console.log("error on fetching all jobs by category" , error);
    })
  }
  const loadCompany = () => {
    Axios.get(`/company/${props.company}/`)
        .then(response => {
          console.log(response.data.company.company_name)
          setCompanyName(response.data.company.company_name);
        })
        .catch(error => {
          console.log('Error fetching company details:', error);
        });
  }

  const loadJobCategory = () => {
    Axios.get(`/job_categories/${props.job_category}/`)
        .then(response => {
          console.log(response.data.job_category.category_name)
          setCategory(response.data.job_category.category_name);
        })
        .catch(error => {
          console.log('Error fetching category details:', error);
        });
  }

  const loadJobSkills = () => {
    Axios.get(`/jobs/${props.id}/`)
    .then(response => {
      console.log(response.data.job.skills)
      const fetchedSkillNames = response.data.job.skills.map(skill => skill.skill_name);

      setSkills(fetchedSkillNames);
    })
    .catch(error => {
      console.log('Error fetching job skills:', error);
    });
  }

  const apply = (id) => {
    navigate(`/application/${id}`)
  }
  return (
<div class="container ">
  {jobsByCategory.map(job=>(

  
<div class="card mb-3" key={job.id}>
      <div class="card-body">
        <div class="d-flex flex-column flex-lg-row">
          <div class="row flex-fill">
            <div class="col">
              <h4 class="h5">{job.job_title}</h4>
           
              <span class="badge bg-secondary">{job.job_description}</span> <span class="badge bg-success">{job.job_salary}</span>
              <button className='btn btn-danger btn-sm' onClick={() => {apply(job.id)}}>Apply</button>
            </div>
           </div>
          </div>
        </div>
      </div>
      
      ))}
    </div>
     )
}
