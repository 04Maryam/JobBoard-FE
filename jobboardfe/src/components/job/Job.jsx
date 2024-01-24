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
    loadSkills()
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

  const loadSkills = () => {
    const skillIds = props.skills.map(skill => skill.id);
    // /skill/?ids=${skillIds.join(',')}
      Axios.get(`/jobs/assoc_job/?job_id=${props.id}&skill_id=${props.skills.id}`)
        .then(response => {
          console.log(response.data)
          const fetchedSkillNames = response.data.map(skill => skill.skill_name);
          console.log(fetchedSkillNames)
          setSkills(fetchedSkillNames);
        })
        .catch(error => {
          console.log('Error fetching skill details:', error);
        });
  }

  return (
    <>
    <td>{companyName}</td>
    <td>{category}</td>
    <td>{props.job_title}</td>
    <td>{props.job_description}</td>
    <td>{props.job_salary}</td>
    <td>{skills.join(',')}</td>
    <td><button className='btn btn-purple btn-sm' onClick={() => {props.editJob(props)}}>Edit</button></td>
    <td><button className='btn btn-danger btn-sm' onClick={() => {props.deleteJob(props.id)}}>Delete</button></td>
    </>
  )
}
