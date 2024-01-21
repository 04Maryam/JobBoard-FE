import React from 'react'

export default function Job(props) {
  return (
    <>
    <td>Company</td>
    <td>Job Category</td>
    <td>{props.job_title}</td>
    <td>{props.job_description}</td>
    <td>{props.job_salary}</td>
    <td>Skills</td>
    </>
  )
}
