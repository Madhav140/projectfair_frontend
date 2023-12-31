import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';

function Header({dashboard}) {
  const navigate = useNavigate()
  const {isAuthToken,setisAuthToken} = useContext(isAuthTokenContext)


      const handleLogout = ()=>{
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("existinguser")
            setisAuthToken(false)
            navigate('/')
      }

  return (
    <>
     <Navbar className="bg-success">
        <Container>
          <Navbar.Brand>
      <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
              <i class="fa-solid fa-people-group me-2 fa-2x"></i>
                {' '}
               <span className='fw-bolder fs-2'> Project-Fair</span>
      </Link>
          </Navbar.Brand>
          {
            dashboard &&
            <button onClick={handleLogout} className='btn btn-warning'><i class="fa-solid fa-power-off me-1"></i>Logout</button>
          }
        </Container>
      </Navbar></>
  )
}

export default Header