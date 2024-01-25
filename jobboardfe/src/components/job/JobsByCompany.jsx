import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function JobsByCompany(props) {

    const companyId = useParams().id

    const gettingJobs = () => {
        console.log('company id', companyId);
        Axios.get(`/company/browse/jobs/?id=${companyId}`)
        .then()
        .catch()
    }

  return (
    <div>

    </div>
  )
}
