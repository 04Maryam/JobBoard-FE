import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import JobCategory from './JobCategory';
export default function JobCategoryList() {
    const [jobCategory, setJobCategory] = useState([]);
    useEffect(() => {
        loadJobCategoryList();
    }, []);


    const loadJobCategoryList = () => {
        Axios.get('http://localhost:8000/job_categories/')
          .then(response => {
            console.log('Job Categories List Loaded');
            console.log(response.data);
            setJobCategory(response.data);
          })
          .catch(error => {
            console.log('Job Categories List not Loaded');
            console.log(error);
          });
    }

      const allTheJobCategories = jobCategory.map((category , index) => (

        <tr key={index}>  
       
          <JobCategory {...category}/>
        </tr>
      ))

  return (
    <div>
      <h1>Job Category List</h1>
      <ul>
        {allTheJobCategories}
      </ul>
    </div>
  )
}
