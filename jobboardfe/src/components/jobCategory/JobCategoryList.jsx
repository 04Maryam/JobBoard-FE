import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import JobCategory from './JobCategory';
import JobCategoryCreateForm from './JobCategoryCreateForm';
import JobCategoryEditForm from './JobCategoryEditForm';
export default function JobCategoryList() {
  const [jobCategory, setJobCategory] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [currentJobCategory, setCurrentJobCategory] = useState({})
  const [jobsByCategory , setJobsByCategory] = useState()
  const setHeaders = () => {
    const authHeader = {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("access_token")
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

  const navigate = useNavigate()

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

  const editJobCategory = (category) => {
    setCurrentJobCategory(category);
    setIsEdit(true);
}

  const updateJobCategory = (updatedCategory) => {
    const id = currentJobCategory.id;
    Axios.put(`/job_categories/${id}/update/`, updatedCategory)
    .then(res => {
      console.log('Job Category updated successfuly', res);
      loadJobCategoryList();
      setIsEdit(false);
    })
    .catch(err => {
      console.log('error updataing Job Category', err);
    })
  }

  // const get_jobs_by_category = (jobs) => {
  //   const id = jobCategory.id
  //   Axios.get(`job_categories/browse/jobs/?category_id=${id}`)
  //   .then(res =>{
  //     console.log("fetch the jobs by categories successfully");
  //     console.log(res.data);
  //     setJobsByCategory(res.data);
  //   })
  //   .catch(error=>{
  //     console.log("error on fetching all jobs by category" , error);
  //   })
  // }
      // const allTheJobCategories = jobCategory.map((category , index) => (

      //   <ul key={index}>  
       
      //     <JobCategory {...category} deleteJobCategory = {deleteJobCategory} editJobCategory={editJobCategory}/>
      //   </ul>
      // ))

      const go_to_job_by_category_page = (id) => {
        navigate(`/job_by_category/${id}`)
      } 

      const handleClick = () => {
        setIsAdd(!isAdd)
    }
    
  return (
    <div>
        <h1>Job Category List</h1>
        <button className='btn' onClick={handleClick}>Add Job Category</button>
        {isAdd && 
        <JobCategoryCreateForm addJobCategory={addJobCategory} />
        }
        {isEdit && 
        <JobCategoryEditForm category={currentJobCategory} updateJobCategory={updateJobCategory} />
        }
        <div className='row'>
            {jobCategory.map((category, index) => (
                <div key={category.id} className='col-sm-3 mb-3 mb-sm-0'>
                    <div className='card'>
                        <div className="card-body">
                            <h5 className="card-title" >{category.category_name}</h5>
                        </div>
                        <div className="card-body">
                            <a href="#" className="card-link" onClick={() => editJobCategory(category)}>Edit</a>
                            <a href="#" className="card-link" onClick={() => deleteJobCategory(category.id)}>Delete</a> &nbsp;
                            <Link to={`/job_by_category/${category.id}`}>
                              Browse Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
