import React, { useState } from 'react'

export default function CompanyEditForm(props) {

    const [currentCompany, setcurrentCompany] = useState(props.currentCompany)

    const handleChange = (e) => {
        const company = {...currentCompany}
        company[e.target.name] = e.target.value
        console.log(company);
        setcurrentCompany(company)
    }

    const handleFileChange = (e) => {
        setcurrentCompany({
            ...currentCompany,
            logo: e.target.files[0], // Get the first file selected
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company_name', currentCompany.company_name);
        formData.append('location', currentCompany.location);
        formData.append('logo', currentCompany.logo);
        formData.append('email', currentCompany.email);
        props.updateCompany(formData)
    }

  return (
    <div>
        <h1 className='text-center mt-5 font'>Edit Company</h1>
        <form onSubmit={handleSubmit} >
        <div className="form-row">
        <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Company Name</label>
                <input value={currentCompany.company_name} className='form-control' type='text' name='company_name' onChange={handleChange}></input>
            </div>

           <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Company Logo</label>
                <input onChange={handleFileChange} className='form-control' type='file' name='logo'></input>
            </div>
            </div>

            <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Location</label>
                <input value={currentCompany.location} onChange={handleChange} className='form-control' type='text' name='location'></input>
            </div>

            <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Email</label>
                <input value={currentCompany.email} onChange={handleChange} className='form-control' type='email' name='email'></input>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}> 
                <input type='submit' value='Updated Company' className="btn btn-purple mb-3"></input>
            </div>
        </form>
    </div>
  )
}
