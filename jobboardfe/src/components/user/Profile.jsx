import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import Axios from 'axios';
import User from './User';
import UserSkillCreateForm from './UserSkillCreateForm';

const Profile = ({user, getUser}) => {
    const [userDetails, setUserDetails] = useState(user)
    const [isEdit, setIsEdit] = useState(false)
    const [getUserInfo, setUserInfo] = useState()
    const [userSkills, setUserSkills] = useState([])

    //all skills
    const [isAdd, setIsAdd] = useState(false);
    const [skillIsEdit, setSkillIsEdit] = useState(false);

    const setHeader = () => {
        const authHeader = {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("access_token")
            }
        }
        return authHeader;
    }
    useEffect(() => {
      setUserInfo(getUser())
        //call api
        userInfo();
    }, []);

      const userInfo = () => {
        Axios.get(`/user/${getUser()}/info/ `)
        .then((response) => {
            console.log(response.data);
            setUserDetails(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
      }

    // fetching user skills
      const loadUserSkills = () => {
        Axios.get(`/user/${getUser()}/info/ `)
        .then((response) => {
            console.log(response.data.profile_info.skills);
            setUserSkills(response.data.profile_info.skills)
        })
        .catch((err) => {
            console.log(err);
        })
      }

      const handleClick = () => {
        setIsAdd(!isAdd)
      }

      const addSkill = (newSkill) => {
        console.log(newSkill)
        Axios.post(`/profile/assoc_profile/?skill_id=${newSkill.id}`, setHeader())
        .then(res => {
          console.log("skill added successfully", res)
          loadUserSkills();
          
        })
        .catch(err => {
          console.log('error adding skill!', err)
        })
      }

      const handleEditClick = () => {
        setIsAdd(!isEdit)
      }

      // const updateUser = (user) => {
      //   Axios.put('/user/update', user, {
      //     headers: {
      //       "Content-Type":  "multipart/form-data",
      //       "Authorization": "Bearer " + localStorage.getItem("access_token")
      //       }
      //   })
      //   .then((res) => {
      //     console.log("user Updated Successfully!");
      //     console.log(res);
      //     loadUsersList();
      //     setIsEdit(false);
      //   })
      //   .catch((err) => {
      //     console.log("Error Updating User Information");
      //     console.log(err);
      //   })
      // }
     

  return (
         <div>
      <section style={{backgroundColor: '#eee'}}>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
          
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <h5 className="my-3">{userDetails.profile_info.first_name} {userDetails.profile_info.last_name}</h5>
            <p className="text-muted mb-1">Username: {userDetails.user_info.username}</p>
            <div>
              <img src={userDetails.profile_info.image}/>
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button type="button" className="btn btn-primary" onClick={handleEditClick}>Edit Profile</button>
              {/* {isEdit && <EditProfile user={userDetails} setIsEdit={setIsEdit} updateUser={updateUser}/>} */}
            </div>
          </div>
        </div>
    </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
             
              <div className="col-sm-3">
                <p className="mb-0">First Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.profile_info.first_name}</p>
              </div>
            </div>
            <div className="row">
             
              <div className="col-sm-3">
                <p className="mb-0">Last Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.profile_info.last_name} </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.profile_info.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.profile_info.phone_number}</p>
              </div>
            </div>
        
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4">Skills</p>
                {console.log(userSkills)}
                {userDetails.profile_info.skills.map((skill, index) => (
                  <div key={index}>
                <p className="mb-1" style={{fontSize: '.77rem'}}>{skill.skill_name}</p>
                <div className="progress rounded" style={{height: '5px'}}>
                  <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                </div>
                ))}
                
              </div>
             <div className='card-body'>
                {!isAdd && <button className='btn btn-secondary' onClick={handleClick}>Add Skill</button>}
                {isAdd && <UserSkillCreateForm addSkill={addSkill}/>}
              </div> 
            </div>
          </div>
         
          </div>
        </div>
      </div>
    </div>
  
</section>
   
    </div>
  );
};

export default Profile;


// import Axios from 'axios';
// import React, { useState,useEffect } from 'react'


// import EditProfile from "./EditProfile";

// export default function Profile() {
  

//     return (
//       <div>
//       <section style={{backgroundColor: '#eee'}}>
//   <div className="container py-5">
//     <div className="row">
//       <div className="col">
//         <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
//           <ol className="breadcrumb mb-0">
          
//             <li className="breadcrumb-item active" aria-current="page">User Profile</li>
//           </ol>
//         </nav>
//       </div>
//     </div>

//     <div className="row">
//       <div className="col-lg-4">
//         <div className="card mb-4">
//           <div className="card-body text-center">
//             <h5 className="my-3">John Smith</h5>
//             <p className="text-muted mb-1">Full Stack Developer</p>
//             <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//             <div className="d-flex justify-content-center mb-2">
//               <button type="button" className="btn btn-primary">Follow</button>
//               <button type="button" className="btn btn-outline-primary ms-1">Message</button>
//             </div>
//           </div>
//         </div>
//     </div>
//       <div className="col-lg-8">
//         <div className="card mb-4">
//           <div className="card-body">
//             <div className="row">
             
//               <div className="col-sm-3">
//                 <p className="mb-0">First Name</p>
//               </div>
//               <div className="col-sm-9">
//                 <p className="text-muted mb-0">Johnatan </p>
//               </div>
//               <div className="col-sm-3">
//                 <p className="mb-0">Last Name</p>
//               </div>
//               <div className="col-sm-9">
//                 <p className="text-muted mb-0"> Smith</p>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-sm-3">
//                 <p className="mb-0">Email</p>
//               </div>
//               <div className="col-sm-9">
//                 <p className="text-muted mb-0">example@example.com</p>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-sm-3">
//                 <p className="mb-0">Phone</p>
//               </div>
//               <div className="col-sm-9">
//                 <p className="text-muted mb-0">(097) 234-5678</p>
//               </div>
//             </div>
        
//             <div className="row">
//               <div className="col-sm-3">
//                 <p className="mb-0">Address</p>
//               </div>
//               <div className="col-sm-9">
//                 <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card mb-4 mb-md-0">
//               <div className="card-body">
//                 <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
//                 </p>
//                 <p className="mb-1" style={{fontSize: '.77rem'}}>Web Design</p>
//                 <div className="progress rounded" style={{height: '5px'}}>
//                   <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80"
//                     aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//                 <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website Markup</p>
//                 <div className="progress rounded" style={{height: '5px'}}>
//                   <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow="72"
//                     aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//                 <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>One Page</p>
//                 <div className="progress rounded" style={{height: '5px'}}>
//                   <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow="89"
//                     aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//                 <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile Template</p>
//                 <div className="progress rounded" style={{height: '5px'}}>
//                   <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow="55"
//                     aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//                 <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend API</p>
//                 <div className="progress rounded mb-2" style={{height: '5px'}}>
//                   <div className="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow="66"
//                     aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
         
//           </div>
//         </div>
//       </div>
//     </div>
  
// </section>
   
//     </div>
//     );
// }

