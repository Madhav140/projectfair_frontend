import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Row,Col } from 'react-bootstrap'
import { getallProject } from '../Services/allApi'
import { Link } from 'react-router-dom'


function Project() {
  const [allproject,setallproject] = useState([])
  const [searchKey,setSearchkey] = useState("")
  const [isToken,setisToken] = useState(false)
  
    const getallprojects = async()=>{
      if(sessionStorage){
        const token = sessionStorage.getItem('token')
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
          const result = await getallProject(searchKey,reqheader)  
          console.log(result.data);
          setallproject(result.data)
        }
    }

    useEffect(()=>{
      getallprojects()
    },[searchKey])

    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setisToken(true)
      }
    },[])

  return (
    <>
    <Header/>

    <div>
      <h1 className='fw-bolder text-center mt-2'>All Project</h1>
    </div>

    <div className='d-flex justify-content-center align-items-center'>
      <div className='input-group  w-25 mt-5'>
      <input value={searchKey} onChange={e=>setSearchkey(e.target.value)} type="text" className='form-control w-25' placeholder='Search the project using technologies' />
      <button className="btn btn-outline-secondary ms-1"type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>

    <Row className='mt-5 container-fluid'>
      {allproject?.length>0?
      allproject?.map((item)=>(
        <Col sm={12} md={6} lg={4}>
      <ProjectCard project={item}/> 
      </Col>)): 
     <div>
       { isToken?<p className='text-center fw-bolder fs-2 text-danger'>No such Projects currently available</p>:
       <div className='d-flex justify-content-center align-items-center flex-column'>
          <img   src="https://i.gifer.com/MeG.gif" width={'500px'} height={'300px'} alt="" />
          <p className='fw-bolder fs-1 text-danger ms-5'>Please <Link style={{textDecoration:"none",color:"skyblue"}} to={'/login'}>Login</Link> to view More Project</p>
        </div>}
     </div>
       }
    </Row>
    </>
  )
}

export default Project