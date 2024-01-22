import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Company from './Company'
import CompanyCreateForm from './CompanyCreateForm'
import CompanyEditForm from './CompanyEditForm'

export default function CompanyList() {

    const [companies, setCompanies] = useState([])
    const [currentCompany, setCurrentCompany] = useState({})
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
      loadCompanyList()
    }, [])
    
    const handleClick = () => {
        setIsAdd(!isAdd)
    }

    const loadCompanyList = () => {
        Axios.get('company/')
        .then(res => {
            console.log('Companies list Fetched successfully!', res);
            setCompanies(res.data)
        })
        .catch(err => {
            console.log('Error Fetching companies', err);
        })
    }

    const createCompany = (newCompany) => {
        Axios.post('company/create/', newCompany)
        .then(res => {
            console.log('company added successfully!', res);
            loadCompanyList();
        })
        .catch(err => {
            console.log('error addig company!', err);
        })
    }

    const editCompany = (company) => {
        setCurrentCompany(company)
        console.log(company);
        setIsEdit(true)
    }

    const updateCompany = (company) => {
        Axios.put(`company/${company.id}/update/`,{
            company_name: company.company_name,
            email: company.email,
            location: company.location,
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
        Axios.delete(`company/${id}/delete`)
        .then(res => {
            console.log('company deleted successfully', res);
            loadCompanyList()
        })
        .catch(err => {
            console.log('error deleting the company', err);
        })
    }

    const allCompany = companies.map((company, index) => {
        return (
            <div key={index} className='col'>
                <Company {...company} editCompany={editCompany} deleteCompany={deleteCompany} />
            </div>
        )
    })

  return (
    <div>
        <h1>Companies</h1>
        <button className='btn' onClick={handleClick}>Add Company</button>
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
