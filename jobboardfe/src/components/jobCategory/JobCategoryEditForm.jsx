import React, { useState } from 'react'

export default function JobCategoryEditForm(props) {
  const [jobCategory, setJobCategory] = useState(props.category)

    const handleChange = (event) => {
      const attributeToChange = event.target.name
      const newValue = event.target.value
      
      const updatedJobCategory = {...jobCategory}
      updatedJobCategory[attributeToChange] = newValue
      console.log(updatedJobCategory)
      setJobCategory(updatedJobCategory)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateJobCategory(jobCategory)
        event.target.reset()
    }
  return (
    <div>
      <h2 className='text-center'>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
            <input type='text' name='category_name' className="form-control" onChange={handleChange} value={jobCategory.category_name}/>
          </div>

        <div>
          <input type='submit' className="btn btn-secondary" value="Update Category" />
        </div>
    </form>
</div>
  )
}
