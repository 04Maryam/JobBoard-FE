import React, { useEffect, useState } from 'react'
import Application from './Application';
import Axios from 'axios'
import ApplicationEditForm from './ApplicationEditForm';
export default function ApplicationList() {
    const [applications, setApplications] = useState([])
    const [chosenApplication, setChosenApplcation] = useState({})
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const setHeaders = () => {
      return{
          headers: {
              // Authorization:'Bearer '+ localStorage.getItem("access_token")
              Authorization:'Bearer '+ localStorage.getItem("access_token")
          }
      };
  }

    useEffect(() => {
      loadApplicationList()
    }, [])

    const loadApplicationList = () => {
        Axios.get('/application/' , setHeaders())
        .then(res => {
            console.log('Applications List Fetched!', res);
            setApplications(res.data.applications)
        })
        .catch(err => {
            console.log('Error Fetching Applications', err);
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
            loadApplicationList()
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






