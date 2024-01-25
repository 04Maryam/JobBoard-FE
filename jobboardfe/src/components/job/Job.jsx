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
    <td>{companyName}</td>
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
    {props.viewApplications && props.user === props.userId && (
  <td>
    <button className='btn btn-danger btn-sm' onClick={() => {props.viewApplications(props.id)}}>
      View Applications
    </button>
  </td>
)}
    </>
  )
}
