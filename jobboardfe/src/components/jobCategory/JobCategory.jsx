import React from 'react'

export default function JobCategory(props) {
  console.log(props)
  return (
    <>
      <li>{props.category_name} <button onClick={() => props.deleteJobCategory(props.id)}>Delete</button> <button onClick={() => props.updateJobCategory(props.id)}>Edit</button></li>
    </>
  )
}
