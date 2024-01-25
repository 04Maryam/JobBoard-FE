import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function JobEditForm(props) {
  const [job, setJob] = useState(props.currentJob)

    const [companies, setCompanies] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
      loadCompanies()
      loadJobCategories()
      loadSkills()
    },[])
    
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
      // const updatedJob = {...job}
      // updatedJob[attributeToChange] = newValue
      // console.log(updatedJob)
      // setJob(updatedJob)
    }

    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateJob(job)
        event.target.reset()
    }
  return (
    
    <div>
      <h2 className='text-center mt-5 font'>Edit Job</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-row">

      <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='form-label fw-bold'>Company</label>
          <select name='company' className="form-select" onChange={handleChange} value={job.company}>
              <option>Select a company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.company_name}</option>
              ))}
          </select>
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label className='form-label fw-bold'>Job Category</label>
          <select name='job_category' className="form-select" onChange={handleChange} value={job.job_category}>
            <option>Select a job category</option>
            {jobCategories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
              </select>
        </div>
       </div>

       <div className="form-row">
       <div className="form-group col-md-6 mb-3 mx-auto">
          <label>Job Title</label>
            <input type='text' name='job_title' className="form-control" value={job.job_title} onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label>Job Description</label>
          <textarea name='job_description' className="form-control" value={job.job_description} onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label>Salary</label>
            <input type='text' name='job_salary' className="form-control" value={job.job_salary} onChange={handleChange} />
        </div>

        <div className="form-group col-md-6 mb-3 mx-auto">
          <label>Skills</label>
          <select name='skills[]' className="form-select" multiple onChange={handleChange} value={job.skills}>
            {skills.map(skill => (
              <option key={skill.id} value={skill.id}>{skill.skill_name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type='submit' className="btn btn-purple mb-3" value="Add Job" />
        </div>
        </div>
    </form>
</div>
  )
}
