import React, { useState } from 'react'

export default function CompanyCreateForm(props) {

    const [newCompany, setNewCompany] = useState({})

    const handleChange = (e) => {
        const company = {...newCompany}
        company[e.target.name] = e.target.value
        console.log(company);
        setNewCompany(company)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createCompany(newCompany)
    }

  return (
    <div>
        <h1>Create a Company</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label className='form-label'>Company Name</label>
                <input className='form-control' type='text' name='company_name' onChange={handleChange}></input>
            </div>
            <div>
                <label className='form-label'>Company Logo</label>
                <input onChange={handleChange} className='form-control' type='file' name='logo'></input>
            </div>
            <div>
                <label className='form-label'>Location</label>
                <input onChange={handleChange} className='form-control' type='text' name='location'></input>
            </div>
            <div>
                <label className='form-label'>Email</label>
                <input onChange={handleChange} className='form-control' type='email' name='email'></input>
            </div>
            <div>
                <input type='submit' value='Save Company'></input>
            </div>
        </form>
    </div>
  )
}
