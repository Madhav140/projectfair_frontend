import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap'
import { addProjectAPI } from '../Services/allApi';
import { addprojectContext } from '../Context/ContextShare';


function Addproject() {
    const [show, setShow] = useState(false);

    const {addprojectResponse,setaddprojectResponse} = useContext(addprojectContext)
  
    //for converting image file to url
    const[preview,setpreview]= useState('')
    //for saving id from token to pass into the reqheader
    const[token,settoken]= useState("")

  const handleClose = () => {
    setShow(false)
    handleClose1()
  };
  const handleShow = () => setShow(true);

   const [project,setproject] = useState({
     title:'',
     lang:'',
     git:'',
     web:'',
     overview:'',
     projectimage:''
   })

    console.log(project);

    const handleClose1 =()=>{
      setproject({
        title:'',
        lang:'',
        git:'',
        web:'',
        overview:'',
        projectimage:''
      })
      setpreview('')
    }

    useEffect(()=>{
      if(project.projectimage){
      setpreview(URL.createObjectURL(project.projectimage))}
    },[project.projectimage])

    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        settoken(sessionStorage.getItem('token'))
      }
      else{
        settoken('')
      }
    },[])

    const handleAdd = async(e)=>{
      e.preventDefault()
      const{title,lang,git,web,overview,projectimage} = project
      if(!title || !lang || !git || !web || !overview || !projectimage){
        alert('please fill the full form')
      }
      else{
        //reqbody
        //1.create object for formdata- since we have data from our computer (not like other post api call)
        const reqbody = new FormData()
        //2.add data to the reqbody using append function
        reqbody.append("title",title)
        reqbody.append("language",lang)
        reqbody.append("github",git)
        reqbody.append("website",web)
        reqbody.append("overview",overview)
        reqbody.append("projectimage",projectimage)

      if(token){ 
         const reqheader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`    //bearer is syntax format and it is predefined

        }
        
        const result = await addProjectAPI(reqbody,reqheader)
        console.log(result);
        if(result.status===200){
          console.log(result.data);
          alert('Project added Successfully')
          handleClose()
          setaddprojectResponse(result.data)
        }
        else{
          console.log(result.response.data);
        }
      
      
      }
      }
    }

  return (
    <>
          <Button variant="success" onClick={handleShow}>
       Add Project
      </Button>

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
              {/* if the type is files then we get the values from e.target.files[0] in onchange */}
                    <input id='image' type="file" style={{display:'none'}} onChange={(e)=>{setproject({...project,projectimage:e.target.files[0]})}} />   
                    <img width={'100%'} src={preview?preview:"https://images.unsplash.com/photo-1563298258-c9b0371b55cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhc3xlbnwwfHwwfHx8MA%3D%3D"} alt=""/>
                </label>
            </Col>
            
            <Col md={6} className='mt-5'>
                   <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={project.title} placeholder='Project Title' onChange={(e)=>{setproject({...project,title:e.target.value})}} />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={project.lang} placeholder='Project Language' onChange={(e)=>{setproject({...project,lang:e.target.value})}} />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={project.git}  placeholder='Github Link' onChange={(e)=>{setproject({...project,git:e.target.value})}}/>
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={project.web}  placeholder='Website Link' onChange={(e)=>{setproject({...project,web:e.target.value})}} />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" className='form-control' value={project.overview}  placeholder='Project Overview' onChange={(e)=>{setproject({...project,overview:e.target.value})}}/>
                    </div>


                   </div>

            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
</>
  )
}

export default Addproject