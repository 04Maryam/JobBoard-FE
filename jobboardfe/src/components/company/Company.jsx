import React from 'react'

export default function Company(props) {
  return (
    <div className="card h-100">
      {props.logo && <img src={`${props.logo}`} alt={props.company_name} />}
      <div className="card-body">
        <h5 className="card-title">{props.company_name}</h5>
        <p className='card-text'>Email: {props.email}</p>
        <p className="card-text">Location: {props.location}</p>
      </div>
      <div className='card-footer'>
        <button className='btn btn-purple' onClick={() => {props.editCompany(props)}}>Edit</button>
        <button className='btn btn-danger' onClick={() => {props.deleteCompany(props.id)}}>Delete</button>
      </div>
    </div>
  )
}
