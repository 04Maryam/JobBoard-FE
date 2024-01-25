import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function UserSkillCreateForm(props) {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        loadSkillList()
    }, [])
    

    const loadSkillList = () => {
        Axios.get('/skill/')
        .then(res => {
            console.log('skills fetched', res);
            setSkills(res.data)
        })
        .catch(err => {
            console.log('error fetching facilities', err);
        })
    }

    const handleChange = (e) => {
        const skill = {...newSkill}
        skill[e.target.name] = e.target.value
        console.log(skill);
        setNewSkill(skill)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addSkill(newSkill)
    }
  return (
    <div>
        <h1>Add a Skill</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Skill</label>
                <select name='skills' className="form-select" onChange={handleChange} value={newSkill.id}>
                    {skills.map(skill => (
                        <option key={skill.id} value={skill.id}>{skill.skill_name}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type='submit' value='Save Skill'></input>
            </div>
        </form>
    </div>
  )
}
