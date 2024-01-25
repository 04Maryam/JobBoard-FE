import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Application from './Application'
import ApplicationEditForm from './ApplicationEditForm'

export default function ApplicationByJob() {

    const jobId = useParams().id
    const [applications, setApplications] = useState([])
    const [chosenApplication, setChosenApplcation] = useState({})
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        loadApplicationsList()
    }, [])

    const setHeaders = () => {
        return{
            headers: {
                // Authorization:'Bearer '+ localStorage.getItem("access_token")
                Authorization:'Bearer '+ localStorage.getItem("access_token")
            }
        };
    }

    const loadApplicationsList = () => {
        console.log(jobId);
        Axios.get(`/application/jobs/?job_id=${jobId}`, setHeaders())
        .then(res => {
            console.log('Applications List Fetched!', res);
            setApplications(res.data.jobs)
        })
        .catch(err => {
            console.log('error loading application list', err);
        })
    }

    const editApplication =(application) => {
        setChosenApplcation(application)
        console.log(application);
        setIsEdit(!isEdit)
    }

    const updateApplication = (application) => {
        Axios.post(`/application/update/?application_id=${chosenApplication.id}`, application, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:'Bearer '+ localStorage.getItem("access_token"),
            },
        })
        .then(res => {
            console.log('application updated successfully', res);
            setIsEdit(false)
            loadApplicationsList()
        })
        .catch(err => {
            console.log('erroe updating application', err);
        })
    }

    const allApplications = applications.map((application, index) => {
        return (
            <div key={index} className='col'>
                <Application {...application} edit={editApplication} />
            </div>
        )
    })

  return (
    <div>
        <h1>Applications</h1>
        {isEdit && 
        <ApplicationEditForm update={updateApplication} currentApplication={chosenApplication} />
        }
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {allApplications}
        </div>
    </div>
  )
}
