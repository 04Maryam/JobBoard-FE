import React, { useEffect, useState } from 'react'
import Skill from './Skill'
import  Axios  from 'axios';
import SkillCreateForm from './SkillCreateForm';
import SkillEditForm from './SkillEditForm';

export default function SkillsList() {

    const [skills, setSkills] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentSkill, setCurrentSkill] = useState({})

    useEffect(() => {
      loadSkillList();
    }, [])
    
    const handleClick = () => {
        setIsAdd(!isAdd)
    }

    const editSkill = (skill) => {
        setCurrentSkill(skill)
        setIsEdit(true)
    }

    const loadSkillList = () => {
        Axios.get('skill/')
        .then(res => {
            console.log('skills fetched', res);
            setSkills(res.data)
        })
        .catch(err => {
            console.log('error fetching facilities', err);
        })
    }

    const createSkill = (newSkill) => {
        Axios.post('skill/create/', newSkill)
        .then(res => {
            console.log('skill added', res);
            loadSkillList();
        })
        .catch(err => {
            console.log('error adding skill', err);
        })
    }

    const updateSkill = (id, updatedSkill) => {
        Axios.put(`skill/${id}/update`, { skill_name: updatedSkill })
        .then(res => {
            console.log('skill updated successfuly', res);
            loadSkillList();
        })
        .catch(err => {
            console.log('error updataing skill', err);
        })
    }

    const deleteSkill = (id) => {
        Axios.delete(`skill/${id}/delete`)
        .then(res => {
            console.log('skill deleted successfully', res);
            loadSkillList();
        })
        .catch(err => {
            console.log('error deleteing skill', err);
        })
    }

  return (
    <div>
        <h1>Skill List</h1>
        <button className='btn' onClick={handleClick}>Add Skill</button>
        {isAdd && 
        <SkillCreateForm createSkill={createSkill} />
        }
        {isEdit && 
        <SkillEditForm skill={currentSkill} updateSkill={updateSkill} />
        }
        <div className='row'>
            {skills.map((skill, index) => (
                <div key={skill.id} className='col-sm-3 mb-3 mb-sm-0'>
                    <div className='card'>
                        <div className="card-body">
                            <h5 className="card-title" >{skill.skill_name}</h5>
                        </div>
                        <div className="card-body">
                            <a href="#" className="card-link" onClick={() => editSkill(skill)}>Edit</a>
                            <a href="#" className="card-link" onClick={() => deleteSkill(skill.id)}>Delete</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
