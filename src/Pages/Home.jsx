import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import titleimage from '../Assets/designer.jpg'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { gethomeProject } from '../Services/allApi'

function Home() {
   const[token,settoken]= useState(false)
   const[homeprojects,sethomeprojects] = useState([])

   const homeProject = async()=>{
    const result = await gethomeProject()
    console.log(result.data);
   sethomeprojects(result.data)
   }

   useEffect(()=>{
    homeProject()
   },[])
 
   
   const login = ()=>{ if(sessionStorage.getItem("token")){
    settoken(true)  
   } }
   useEffect(()=>{login()},[])

  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'lightgreen'}}>
       <div className='container-fluid rounded'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6} >
          <h1 style={{fontSize:'90px',color:'white'}}>Project Fair</h1>
          <p>One stop destination for all software development Projects</p>

{   token?   
     <Link to={'/dashboard'}>  <button className='btn btn-success rounded'>Manage Projects <i class="fa-solid fa-arrow-right ms-2"></i></button>
     </Link>:
  <Link to={'/login'}><button className='btn btn-success rounded'>Get started <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>

}  
          </Col>
          <Col sm={12} md={6}>
          <img src={titleimage} alt="" style={{borderRadius:'100px'}} className='w-100 mt-3 me-5'/>
          </Col>
        </Row>
       </div>
       </div>
       <div className='all-project mt-5'>
        <h1 className='text-center mt-5'>All Projects</h1>
        <marquee scrollAmount = {12} className="mt-5">
           
            <div className='d-flex'>
            {homeprojects?.length>0?
            homeprojects.map((item)=>(
            <div className='ms-5' style={{width:'450px'}}>
                    <ProjectCard project={item}/>
            </div>)):null
            }
  
           </div>
        </marquee>

        <div className='text-center mt-5'>
          <Link to={'/project'}>See more Projects</Link>
        </div>
       </div>
    </>
  )
}

export default Home