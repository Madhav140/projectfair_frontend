import React, { useEffect } from 'react'
import icon from '../Assets/Personicon.png'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { editProfileAPI } from '../Services/allApi';
import { BASE_URL } from '../Services/baseurl';

function Profile({user}) {

    const [open, setOpen] = useState(false);
    const [preview,setpreview] = useState("")

    
    const [profile,setprofile] = useState({
      id:user._id,
      photo:"",
      gitprofile:user.github,
      linkedin:user.linkedin
    })

    useEffect(()=>{
      if(profile.photo){
        setpreview(URL.createObjectURL(profile.photo))
      }
     },[profile.photo])

    const handleUpdate = async()=>{
      const {id,photo,gitprofile,linkedin} = profile
      if( !gitprofile || !linkedin){
        alert('please fill the full form')
      }
      else{
        const reqBody = new FormData()
        reqBody.append("username",user.username)
        reqBody.append("email",user.email)
        reqBody.append("password",user.password)
        reqBody.append("gitprofile",gitprofile)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("photo",photo):reqBody.append("photo",user.profile)


        const token = sessionStorage.getItem("token")

        if(preview){ 
          const reqheader = {
           "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`   
         }
             
           const result = await editProfileAPI(id,reqBody,reqheader)
            console.log(result);
            if(result.status===200){
              alert("Profile Uploaded Successfully")
              sessionStorage.setItem("existinguser",JSON.stringify(result.data))
            }
            else{
              console.log(result.response.data);
            }
      }
      else{
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`   
        }
            
          const result = await editProfileAPI(id,reqBody,reqheader)
           console.log(result);
           if(result.status===200){
             alert("Profile Uploaded Successfully")
             sessionStorage.setItem("existinguser",JSON.stringify(result.data))


           }
           else{
             console.log(result.response.data);
           }
      }
    }
  }

 


  return (
    <>

       <div className='card shadow p-5'>
           <div className='d-flex justify-content-between'>
            <h3>Profile</h3>
            <button  onClick={()=>setOpen(!open)} className='btn btn-secondary' ><i class="fa-solid fa-arrow-right-from-bracket fa-rotate-90"></i></button>
           </div>
          <Collapse in={open}>
               <div className='row justify-content-center mt-3'>
                <label htmlFor="profile" className='text-center'>
                    <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>{setprofile({...profile,photo:e.target.files[0]})}}/>
{ user.profile || preview?          
    <img className='w-50' src={preview?preview:`${BASE_URL}/uploads/${user.profile}`} alt="no image" />:
    <img className='w-50' src={icon} alt="no image" />

}                </label>
                <div className="mb-3 mt-4">
                    <input type="text" placeholder='Github' value={profile.gitprofile}  className='form-control' onChange={(e)=>{setprofile({...profile,gitprofile:e.target.value})}} />
                </div>
                <div className="mb-3">
                <input type="text" placeholder='LinkedIn' value={profile.linkedin} className='form-control' onChange={(e)=>{setprofile({...profile,linkedin:e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <button onClick={handleUpdate} className='btn btn-success rounded w-100 mt-3'>Update</button>
                </div>
               </div>
          </Collapse>
             

       </div>
    
    </>
  )
}

export default Profile