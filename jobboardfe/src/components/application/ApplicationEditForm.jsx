import React, { useState } from 'react'

export default function ApplicationEditForm(props) {

  const [currentApplication, setCurrentApplication] = useState(props.currentApplication)

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setCurrentApplication({
      ...currentApplication,
      resume: e.target.files[0], // Get the first file selected
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('resume', currentApplication.resume);
    props.update(formData)
    e.target.reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label className='form-label'>Upload your resume</label>
          <input className='form-control' type='file' name='resume' onChange={handleChange}></input>
        </div>
        <div>
          <input type='submit' value='Save Application'></input>
        </div>
      </form>
    </div>
  )
}
