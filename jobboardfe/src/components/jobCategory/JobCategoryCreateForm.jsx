import React, { useState } from 'react'
import Axios from 'axios'

export default function JobCategoryCreateForm(props) {
    const [newJobCategory, setJobCategory] = useState('')

    const handleChange = (event) => {
      const attributeToChange = event.target.name
      const newValue = event.target.value
      
      const jobCategory = {...newJobCategory}
      jobCategory[attributeToChange] = newValue
      console.log(jobCategory)
      setJobCategory(jobCategory)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addJobCategory(newJobCategory)
        event.target.reset()
    }
  return (
    <div>
      <h2 className='text-center'>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
            <input type='text' name='category_name' className="form-control" onChange={handleChange} />
          </div>

        <div>
          <input type='submit' className="btn btn-secondary" value="Add Category" />
        </div>
    </form>
</div>
  )
}
