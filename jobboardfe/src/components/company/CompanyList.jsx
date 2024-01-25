import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  Link } from "react-router-dom";
import Company from './Company'
import CompanyCreateForm from './CompanyCreateForm'
import CompanyEditForm from './CompanyEditForm'
import { useNavigate } from 'react-router-dom'

export default function CompanyList(props) {

    const [companies, setCompanies] = useState([])
    const [currentCompany, setCurrentCompany] = useState({})
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate()

    const setHeaders = () => {
        return{
            headers: {
                // Authorization:'Bearer '+ localStorage.getItem("access_token")
                Authorization:'Bearer '+ localStorage.getItem("access_token")
            }
        };
    }
    useEffect(() => {
      loadCompanyList()
    }, [])
    
    const handleClick = () => {
        setIsAdd(!isAdd)
    }

    const loadCompanyList = () => {
        Axios.get('/company/')
        .then(res => {
            console.log('Companies list Fetched successfully!', res);
            setCompanies(res.data)
        })
        .catch(err => {
            console.log('Error Fetching companies', err);
        })
    }

    const createCompany = (newCompany) => {
        Axios.post('/company/create/', newCompany, setHeaders())
        .then(res => {
            console.log('company added successfully!', res);
            loadCompanyList();
        })
        .catch(err => {
            console.log('error Adding company! Error in React!', err);
        })
    }

    const editCompany = (company) => {
        setCurrentCompany(company)
        console.log(company);
        setIsEdit(true)
    }

    const updateCompany = (company) => {
        Axios.post(`/company/update/?company_id=${currentCompany.id}`, company, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:'Bearer '+ localStorage.getItem("access_token"),
            },
        })
        .then(res => {
            console.log('company info updated', res);
            setIsEdit(false)
            loadCompanyList()
        })
        .catch(err => {
            console.log('error updating company info', err);
        })
    }

    const deleteCompany = (id) => {
        Axios.delete(`/company/${id}/delete/`, setHeaders())
        .then(res => {
            console.log('company deleted successfully', res);
            loadCompanyList()
        })
        .catch(err => {
            console.log('error deleting the company', err);
        })
    }

    const viewJobs = (id) => {
        navigate(`/job/compnany/${id}`)
    }

    const allCompany = companies.map((company, index) => {
        return (
            <div key={index} className='col'>
                <Company {...company} editCompany={editCompany} deleteCompany={deleteCompany} viewJobs={viewJobs} />
            </div>
        )
    })

  return (
    <div>
        <h1 className='font mt-3 text-center'>Companies</h1>
        <Link to="/company/create/"><button className='btn btn-purple btn-sm mb-3' onClick={handleClick}>Add Company</button></Link>
        {isAdd && 
        <CompanyCreateForm createCompany={createCompany} />
        }
        {isEdit &&
        <CompanyEditForm currentCompany={currentCompany} updateCompany={updateCompany} setCurrentCompany={setCurrentCompany} />
        }
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {allCompany}
        </div>
    </div>
  )
}
