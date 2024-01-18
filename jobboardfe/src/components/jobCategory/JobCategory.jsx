import React from 'react'

export default function JobCategory(props) {
  console.log(props)
  return (
    <>
        <li>{props.category_name}</li>
    </>
  )
}
