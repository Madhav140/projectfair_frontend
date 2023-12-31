import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl';
import { editProjectAPI } from '../Services/allApi';
import { editProjectResponseContext } from '../Context/ContextShare';

function EditProject({project}) {
    const [show, setShow] = useState(false);
    const [preview,setpreview] = useState('')

    const {editprojectResponse,seteditprojectResponse} = useContext(editProjectResponseContext)

    const [projects,setprojects] = useState({
        id:project._id,
        title:project.title,
        lang:project.language,
        git:project.github,
        web:project.website,
        overview:project.overview,
        projectimage:""
      })

    const handleClose = () =>{ 
      setShow(false); 
       handleclose1()}

      const handleShow = () => setShow(true);

      useEffect(()=>{
        if(projects.projectimage){
            setpreview(URL.createObjectURL(projects.projectimage))
        }
      },[projects.projectimage])


      const handleclose1 =()=>{
          setprojects({
            id:project._id,
            title:project.title,
            lang:project.language,
            git:project.github,
            web:project.website,
            overview:project.overview,
            projectimage:""
          })
          setpreview(null)
      }

      const handleUpdate = async()=>{
        const{id,title,lang,git,web,overview,projectimage} = projects
        if(!title || !lang || !git || !web || !overview){
            alert('please fill the full form')
          }
          else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",lang)
        reqBody.append("github",git)
        reqBody.append("website",web)
        reqBody.append("overview",overview)
       preview?reqBody.append("projectImage",projectimage):reqBody.append("projectImage",project.projectImage)
      
          
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqheader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`   
          }
          const result = await editProjectAPI(id,reqBody,reqheader)
          console.log(result);
          if(result.status===200){
            alert('Successfully Updated')
            handleClose()
            seteditprojectResponse(result.data)
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
          const result = await editProjectAPI(id,reqBody,reqheader)
          console.log(result);
          if(result.status===200){
            alert('Successfully Updated')
            handleClose()
            seteditprojectResponse(result.data)

          }
         else{
          console.log(result.response.data);
         }
      }
     }
  }


  return (
    <>
     <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info fa-lg"></i></button>


     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col md={6}>
            <label htmlFor="image" className='text-center'>
                    <input id='image' type="file" style={{display:'none'}} onChange={e=>setprojects({...projects,projectimage:e.target.files[0]})} />   
                    <img width={'100%'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt=""/>
                </label>
            </Col>
            
            <Col md={6} className='mt-5'>
                   <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={projects.title} onChange={e=>setprojects({...projects,title:e.target.value})} placeholder='Project Title'  />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control'  placeholder='Project Language' value={projects.lang} onChange={e=>setprojects({...projects,lang:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control'   placeholder='Github Link' value={projects.git} onChange={e=>setprojects({...projects,git:e.target.value})}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control'  placeholder='Website Link' value={projects.web} onChange={e=>setprojects({...projects,web:e.target.value})} />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control'   placeholder='Project Overview' value={projects.overview} onChange={e=>setprojects({...projects,overview:e.target.value})} />
                    </div>


                   </div>

            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleclose1} >
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject