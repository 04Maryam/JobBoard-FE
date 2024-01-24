import React from 'react'

export default function Company(props) {
  return (
    <div className="card h-100">
      {props.logo && <img src={`${props.logo}`} alt={props.company_name} style={{width: '100%', height: '225'}} />}
      <div className="card-body">
        <h5 className="card-title">{props.company_name}</h5>
        <p className="card-text">{props.location}</p>
        <p className='card-text'>{props.email}</p>
      </div>
      <div className='card-footer'>
        <button className='btn btn-purple btn-sm' onClick={() => {props.editCompany(props)}}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={() => {props.deleteCompany(props.id)}}>Delete</button>
      </div>
    </div>
  )
}
