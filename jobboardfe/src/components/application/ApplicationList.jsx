import React, { useEffect, useState } from 'react'
import Application from './Application';
import Axios from 'axios'
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
            setApplications(res.data)
        })
        .catch(err => {
            console.log('Error Fetching Applications', err);
        })
    }

    const allApplications = applications.map((application, index) => {
        return (
            <div key={index} className='col'>
                <Application {...application} />
            </div>
        )
    })

  return (
    <div>
        <h1>Applications</h1>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {allApplications}
        </div>
    </div>
  )
}






