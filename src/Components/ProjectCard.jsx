import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap'
import mediaimage from '../Assets/Mediaplayer.png'
import { BASE_URL } from '../Services/baseurl';



function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card className='btn shadow' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:mediaimage} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{height:"200px"}}>
            <Col md={6}>
                <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:mediaimage} width={'100%'} alt="" />
            </Col>
            <Col md={6}>
              <p>{project.overview}</p>
                <p><span className='fw-bolder'>Technologies</span>: {project.language}</p>
            </Col>

          </Row>

          <div className='d-flex mt-3'>
             <a style={{color:"grey"}} href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5 mt-5"></i></a>
             <a style={{color:"grey"}} href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5 mt-5"></i></a>
          </div>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default ProjectCard