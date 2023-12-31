import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Myproject from '../Components/Myproject'
import Profile from '../Components/Profile'
import { Row,Col } from 'react-bootstrap'


function Dashboard() {
    const user = JSON.parse(sessionStorage.getItem('existinguser'))

  return (
    <>
        <Header dashboard/>
        <h2 className='ms-4 mt-3'>Welcome <span className='text-warning'>{user.username}</span></h2>
       <Row className='container-fluid mt-5'>
        <Col md={8}>
              <Myproject/>

        </Col>
        <Col md={4}>
           <Profile user={user}/>

        </Col>

       </Row>
    </>
  )
}

export default Dashboard