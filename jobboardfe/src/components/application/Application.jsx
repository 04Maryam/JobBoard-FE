import React from 'react'

export default function Application(props) {
  return (
    <div className="card h-100">
        <div class="card-header">
            {props.application_date}
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.job}</h5>
            <p className="card-text">Status: {props.status}</p>
            <a href={`${props.resume}`}>Resume</a>
        </div>
        <div className='card-footer'>
            <button className='btn btn-purple btn-sm' onClick={() => {props.editApplication(props)}}>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={() => {props.deleteApplication(props.id)}}>Delete</button>
        </div>
    </div>
  )
}