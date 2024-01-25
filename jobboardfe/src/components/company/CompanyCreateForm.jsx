import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Axios from 'axios'

export default function CompanyCreateForm(props) {

    const navigate = useNavigate()

    console.log("props", props)

    
    const setHeaders = () => {
        return{
            headers: {
                // Authorization:'Bearer '+ localStorage.getItem("access_token")
                Authorization:'Bearer '+ localStorage.getItem("access_token")
            }
        };
    }

    // const [newCompany, setNewCompany] = useState({})
    const [newCompany, setNewCompany] = useState({
        company_name: '',
        location: '',
        logo: null, // This will hold the selected file
        email: '',
      });

    const handleChange = (e) => {
        const company = {...newCompany}
        company[e.target.name] = e.target.value
        console.log(company);
        setNewCompany(company)
    }

    const handleFileChange = (e) => {
        setNewCompany({
            ...newCompany,
            logo: e.target.files[0], // Get the first file selected
          })
    }

    const createCompany = (newCompany) => {
        Axios.post('/company/create/', newCompany, setHeaders())
        .then(res => {
            console.log('company added successfully!', res);
            navigate('/company/')
        })
        .catch(err => {
            console.log('error Adding company! Error in React!', err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company_name', newCompany.company_name);
        formData.append('location', newCompany.location);
        formData.append('logo', newCompany.logo);
        formData.append('email', newCompany.email);
        createCompany(formData)
    }

  return (
    <div>
        <h1 className='text-center mt-5 font'>Create a Company</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">

        <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Company Name</label>
                <input className='form-control' type='text' name='company_name' onChange={handleChange}></input>
            </div>

             <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Company Logo</label>
                <input onChange={handleFileChange} className='form-control' type='file' name='logo'></input>
            </div>
            </div>

            <div className="form-row">
            <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Location</label>
                <input onChange={handleChange} className='form-control' type='text' name='location'></input>
            </div>

              <div className="form-group col-md-6 mb-3 mx-auto">
                <label className='form-label fw-bold'>Email</label>
                <input onChange={handleChange} className='form-control' type='email' name='email'></input>
            </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type='submit' className="btn btn-purple mb-3" value='Save Company'></input>
            </div>
        </form>
    </div>
  )
}
