import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteuserProject, getuserProject } from '../Services/allApi'
import { addprojectContext, editProjectResponseContext } from '../Context/ContextShare'
import EditProject from './EditProject'

function Myproject() {
  const [userproject,setuserproject] = useState([])

  const {addprojectResponse,setaddprojectResponse} = useContext(addprojectContext)
  const {editprojectResponse,seteditprojectResponse} = useContext(editProjectResponseContext)


  const userProjects = async()=>{
   const token = sessionStorage.getItem("token")
   const reqheader = {
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  }
    const result =  await getuserProject(reqheader)
    console.log(result);
    setuserproject(result.data)
  }

  useEffect(()=>{
    userProjects()
  },[addprojectResponse,editprojectResponse])


   const handleDelete = async(id)=>{
         const token = sessionStorage.getItem("token")
         const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }

        const result = await deleteuserProject(id,reqheader)
        console.log(result);
        if(result.status===200){
        userProjects()
        }
   }

  return (
    <>
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
   <h3 className='text-success'>My projects</h3>
   <Addproject/>
        </div>

        <div className='mt-4'>
           { userproject?.length>0?
           userproject.map((item)=>(
           <div className='border d-flex border-align-items-center p-3 rounded'>
        <h5>{item.title}</h5>
        <div className="ms-auto d-flex">
                      
                      <EditProject project={item}/>
             
            <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-success fa-xl"></i></a>
            <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash-can text-danger fa-lg"></i></button>
        </div>

            </div>)):
            <p className='text-danger fw-bolder fs-4 mt-2'>No Projects Uploaded yet !!</p>}
        </div>

    </div>
    </>
  )
}

export default Myproject