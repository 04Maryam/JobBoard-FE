import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import JobCategory from './JobCategory';
import JobCategoryCreateForm from './JobCategoryCreateForm';
import JobCategoryEditForm from './JobCategoryEditForm';
export default function JobCategoryList() {
  const [jobCategory, setJobCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [currentJobCategory, setCurrentJobCategory] = useState({})

  const setHeaders = () => {
    const authHeader = {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("token")
      }
    }
    return authHeader;
  }

  // const getCSRFToken = () => {
  //   const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
  //   return cookieValue ? cookieValue[1] : null;
  // }
  useEffect(() => {
    loadJobCategoryList();
  }, []);


    const loadJobCategoryList = () => {
        Axios.get('/job_categories/')
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

    const addJobCategory = (job_category) => {
      Axios.post("/job_categories/create/", job_category)
      .then(res =>{
        console.log('Job Category has been Added') 
        loadJobCategoryList()
      })
      .catch(err => {
        console.log('Job Category Cannot be added')
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

  const deleteJobCategory = (id) => {
    Axios.delete(`/job_categories/${id}/delete/`)
    .then(res => {
        console.log("Record deleted Successfullyyy !!");
        console.log(res);
        loadJobCategoryList();
    })
    .catch(err => {
        console.log("Error deleting Category");
        console.log(err);
    })  
  }


  const updateJobCategory = (category) => {
    Axios.put(`/job_categories/id=${currentJobCategory.id}/update/`, category)
    .then(res => {
        console.log("Category Updated Successfullyyy !!");
        console.log(res);
        loadJobCategoryList();
        setIsEdit(false);
        
    })
    .catch(err => {
        console.log("Error Updating Category");
        console.log(err);
    })  
}

      const allTheJobCategories = jobCategory.map((category , index) => (

        <ul key={index}>  
       
          <JobCategory {...category} deleteJobCategory = {deleteJobCategory}/>
        </ul>
      ))

  return (
    <div>
      <div>
        <h1>Job Category List</h1>

        {allTheJobCategories}

      </div>

      {(!isEdit) ?
      <JobCategoryCreateForm addJobCategory = {addJobCategory}/>
        :
        <JobCategoryEditForm key={currentJobCategory.id} category={currentJobCategory} updateJobCategory={updateJobCategory} />
      }
      {/* <JobCategoryCreateForm addJobCategory = {addJobCategory}/> */}
    </div>
  )
}
