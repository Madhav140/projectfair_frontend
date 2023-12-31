import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <div style={{width:'100%',height:'250px',color:'white'}} className='d-flex justify-content-center align-items-center flex-column mt-5 w-100 bg-success'>

<div className='footer d-flex justify-content-evenly align-items-evenly w-100 mt-4'>

  <div className="website" style={{width:'400px'}}>
    <h4><i class="fa-solid fa-people-group me-2"></i>{' '}PROJECT FAIR</h4>
  <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem dolores natus exercitationem inventore nihil molestias deleniti dignissimos perspiciatis id cum nam magnam modi!</p>
  </div>

  <div className="links d-flex flex-column">
    <h4>Links</h4>
    <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home</Link>
    <Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Login</Link>
    <Link to={'/register'} style={{textDecoration:'none',color:'white'}}>Register</Link>
    <Link to={'/project'} style={{textDecoration:'none',color:'white'}}>Project</Link>

  </div>
  <div className="guides d-flex flex-column">
  <h4>Useful Links</h4>
  <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white'}}>Pricing</Link>
    <Link to={'https://react-bootstrap.netlify.app/'} style={{textDecoration:'none',color:'white'}}>Settings</Link>
    <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white'}}>Orders</Link>
    <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white'}}>Help</Link>

  </div>
  <div className="contact">
      <h4 className='mb-3'>Contact Us</h4>
      <div className='d-flex mb-4 flex-column'>
       <div className='mb-1'><i class="fa-solid fa-location-dot me-2"></i>Kakkanad</div>
       <div className='mb-1'><i class="fa-solid fa-envelope me-2"></i>madhav@gmail.com</div>
       <div className='mb-1'><i class="fa-solid fa-phone me-2"></i>7638984765</div>

      </div>

  </div>
</div>
<p> © 2023 Copyright:Projectfair.com</p>
</div>
    </>
  )
}

export default Footer