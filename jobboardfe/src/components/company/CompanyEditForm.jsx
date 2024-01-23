import React, { useState } from 'react'

export default function CompanyEditForm(props) {

    const [currentCompany, setcurrentCompany] = useState(props.currentCompany)

    const handleChange = (e) => {
        const company = {...currentCompany}
        company[e.target.name] = e.target.value
        console.log(company);
        setcurrentCompany(company)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateCompany(currentCompany)
    }

  return (
    <div>
        <h1>Create a Company</h1>
        <form onSubmit={handleSubmit} >
            <div>
                <label className='form-label'>Company Name</label>
                <input value={currentCompany.company_name} className='form-control' type='text' name='company_name' onChange={handleChange}></input>
            </div>
            <div>
                <label className='form-label'>Company Logo</label>
                <input onChange={handleChange} className='form-control' type='file' name='logo'></input>
            </div>
            <div>
                <label className='form-label'>Location</label>
                <input value={currentCompany.location} onChange={handleChange} className='form-control' type='text' name='location'></input>
            </div>
            <div>
                <label className='form-label'>Email</label>
                <input value={currentCompany.email} onChange={handleChange} className='form-control' type='email' name='email'></input>
            </div>
            <div>
                <input type='submit' value='Save Company'></input>
            </div>
        </form>
    </div>
  )
}
