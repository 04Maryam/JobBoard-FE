import React, { useState } from 'react'

export default function SkillEditForm(props) {

    const [skillName, setSkillName] = useState(props.skill.skill_name);

    const handleChange = (e) => {
        setSkillName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateSkill(props.skill.id, skillName);
    };

  return (
    <div>
        <h1>Edit Skill</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Skill Name</label>
                <input type='text' name='skill_name' value={skillName} onChange={handleChange}></input>
            </div>
            <div>
                <input type='submit' value='Save Skill'></input>
            </div>
        </form>
    </div>
  )
}
