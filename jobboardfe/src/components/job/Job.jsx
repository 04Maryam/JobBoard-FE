import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function Job(props) {
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState([])

  console.log(props);
  useEffect(() => {
    loadCompany()
    loadJobCategory()
    loadJobSkills()
  }, []);

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


  return (
    <>
    {/* <td>{companyName}</td>
    <td>{category}</td>
    <td>{props.job_title}</td>
    <td>{props.job_description}</td>
    <td>{props.job_salary}</td>
    <td>{skills.join(', ')}</td>
    {(props.user == props.userId) &&(props.viewApplications) ? (
    <>
      <td>
        <button className='btn btn-purple btn-sm' onClick={() => {props.editJob(props)}}>
          Edit
        </button>
      </td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={() => {props.deleteJob(props.id)}}>
          Delete
        </button>
      </td>
    </>
  ) : null}
    <td><button className='btn btn-danger btn-sm' onClick={() => {props.apply(props.id)}}>Apply</button></td>

    {props.viewApplications &&
    <td><button className='btn btn-danger btn-sm' onClick={() => {props.viewApplications(props.id)}}>View Applications</button></td>
    } */}

<div className="container mx-auto">
<div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column flex-lg-row">
          <div className="row flex-fill">
            <div className="col">
              <h4 className="h5">{props.job_title}</h4>
              <span className="badge bg-dark">{companyName}</span> <span className="badge bg-dark">{category}</span>&nbsp;
              <span className="badge bg-dark">{props.job_description}</span> <span className="badge bg-dark">{props.job_salary}</span>
            </div>
            <div className="col-sm-4 py-2">
              <h6>Required Skills: </h6>
              <span className="badge bg-secondary">{skills.join(', ')}</span>
            </div>
            <div className=" text-lg-end">
            {(props.user == props.userId) &&(props.viewApplications) ? (
              <>

    {/* <button className='btn btn-success btn-sm' onClick={() => {props.apply(props.id)}}>Apply</button>
    {props.viewApplications &&
    <button className='btn btn-danger btn-sm' onClick={() => {props.viewApplications(props.id)}}>View Applications</button>} */}
    
    
    <button className='btn btn-purple btn-sm' onClick={() => {props.editJob(props)}}>Edit</button>
    <button className='btn btn-danger btn-sm' onClick={() => {props.deleteJob(props.id)}}>Delete</button>
    </>
     ) : null}

  <button className='btn btn-success btn-sm' onClick={() => {props.apply(props.id)}}>Apply</button>

    {props.viewApplications &&
    <button className='btn btn-danger btn-sm' onClick={() => {props.viewApplications(props.id)}}>View Applications</button>}
           </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    

    </>
  )
}
