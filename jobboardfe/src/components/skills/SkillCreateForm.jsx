import React, { useState } from 'react'

export default function SkillCreateForm(props) {

    const [skillName, setSkillName] = useState('');

    const handleChange = (e) => {
        const skill = {...skillName}
        skill[e.target.name] = e.target.value
        console.log(skill);
        setSkillName(skill)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createSkill(skillName)
    }

  return (
    <div>
        <h1>Create a Skill</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Skill Name</label>
                <input className='form-control' type='text' name='skill_name' onChange={handleChange}></input>
            </div>
            <div>
                <input type='submit' value='Save Skill'></input>
            </div>
        </form>
    </div>
  )
}
