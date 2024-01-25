import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios';

export default function JobCreateForm(props) {
  const navigate = useNavigate()
    const [newJob, setJob] = useState({
      company: '',  
      job_category: '',
      job_title: '',
      job_description: '',
      job_salary: '',
      skills: []
    })

    const [companies, setCompanies] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
      loadCompanies()
      loadJobCategories()
      loadSkills()
    },[])

    const setHeaders = () => {
      return{
          headers: {
              // Authorization:'Bearer '+ localStorage.getItem("access_token")
              Authorization:'Bearer '+ localStorage.getItem("access_token")
          }
      };
  }
    
    // Fetch data for companies, job categories, and skills
    const loadCompanies = () => {
      Axios.get('/company/')
      .then(response => {
        console.log('Companies list loaded');
        console.log(response.data);
          setCompanies(response.data);
      })
      .catch(error => {
          console.log('Companies not loaded', error);
      });
    }

    const loadJobCategories = () => {
      Axios.get('/job_categories/')
          .then(response => {
            console.log('Job Categories List Loaded');
            console.log(response.data);
            setJobCategories(response.data);
          })
          .catch(error => {
            console.log('Job Categories List not Loaded');
            console.log(error);
          });
    }

    
    const addJob = (job) => {
      console.log('Adding job:', job);
      Axios.post(`/jobs/create/?category_id=${job.job_category}&company_id=${job.company}`, job, setHeaders())
      .then(res =>{
        console.log('Job has been Added',res) 
        navigate('/jobs/')
      })
      .catch(err => {
        console.log('Job cannot be Added')
        console.log(err) 
      })
    }

    const loadSkills = () => {
      Axios.get('/skill/')
          .then(response => {
            console.log('Skills List Loaded');
            console.log(response.data);
            setSkills(response.data);
          })
          .catch(error => {
            console.log('Skills List not Loaded');
            console.log(error);
          });
    }
    const handleChange = (event) => {
      const attributeToChange = event.target.name
      const newValue = event.target.value
      
      if (attributeToChange === 'skills[]') {
        const selectedSkills = Array.from(event.target.selectedOptions, option => parseInt(option.value, 10));
        setJob(prevJob => ({ ...prevJob, skills: selectedSkills }));
      } else {
        setJob(prevJob => ({ ...prevJob, [attributeToChange]: newValue }));
      }
      // const job = {...newJob}
      // job[attributeToChange] = newValue
      // console.log(job)
      // setJob(job)
    }

    
    const handleSubmit = (event) => {
        event.preventDefault()
        addJob(newJob)
        event.target.reset()
    }
  return (
    
   <>
      <h2 className='text-center mt-5 font'>Create Job</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-row">

          <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Company</label>
          <select name='company' className="form-select" onChange={handleChange} value={newJob.company}>
              <option>Select a company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.company_name}</option>
              ))}
          </select>
        </div>

         <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Job Category</label>
          <select name='job_category' className="form-select" onChange={handleChange} value={newJob.job_category}>
            <option>Select a job category</option>
            {jobCategories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
              </select>
        </div>
        </div>

        <div className="form-row">
        <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Job Title</label>
            <input type='text' name='job_title' className="form-control" onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Job Description</label>
          <textarea name='job_description' className="form-control" onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Salary</label>
            <input type='text' name='job_salary' className="form-control" onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='fw-bold'>Skills</label>
          <select name='skills[]' className="form-select" multiple onChange={handleChange} value={newJob.skills}>
            {skills.map(skill => (
              <option key={skill.id} value={skill.id}>{skill.skill_name}</option>
            ))}
          </select>
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type='submit' className="btn btn-purple mb-3" value="Add Job" />
        </div>
    </form>
</>

  )
}
