import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from '../Assets/login.jpg'
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../Services/allApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthTokenContext } from '../Context/ContextShare';
 

function Auth({register}) {

     //create a state to hold the value of user registration details
     const [userdata,setuserdata] = useState({
      username:"",
      email:"",
      password:""
     })
     console.log(userdata);

     const navigate = useNavigate()

     const {isAuthToken,setisAuthToken} = useContext(isAuthTokenContext)


     const handleRegister = async(e)=>{
      e.preventDefault()
          const {username,email,password} = userdata
          if(!username || !email || !password){
            toast.info('please fill the full form')
          }
            else{
             const result =  await registerAPI(userdata)
             console.log(result);
             if(result.status>=200&&result.status<300){
              toast.success(`${result.data.username} is Successfully Registered`)
              setuserdata({
                username:"",
                email:"",
                password:""
              })
              navigate('/login')
             }
             else{
                 toast.error(result.response.data)    
             }
            }   
     }

     const handleLogin = async(e)=>{
          e.preventDefault()
          const{email,password} = userdata
          if(!email || !password){
            alert('please fill the full form')
          }
          else{
           const result =  await loginAPI(userdata)
           console.log(result);
          if(result.status===200){
            //alert
            alert('Login Successful')
            setisAuthToken(true)
            //store
            sessionStorage.setItem('existinguser',JSON.stringify(result.data.existuser))
            sessionStorage.setItem('token',result.data.token)

            //empty state
            setuserdata({
              email:"",
              password:""
            })
            //navigate
            navigate('/')

          }
          else{
            alert(result.response.data)
          }

          }
     }
     

    const registerform = register?true:false
  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5'>    
     <Link to={'/'} style={{textDecoration:'none',color:'black'}}><i class="fa-solid fa-arrow-left me-2"></i>Back to Home</Link>
   </div>
    
           <div className='d-flex justify-content-center align-items-center' >
            <div className='row' style={{backgroundColor:'lightgreen',width:'1300px',height:"600px"}}>
                <div className="col-6 mt-5">
                    <img src={login} width={'100%'} alt="" />
                </div>
                <div className="col-6">
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                      <h1 className='text-light mt-4'><i class="fa-solid fa-people-group me-2 fa-1x"></i>Project-Fair</h1>
                      <h5 className='text-light ms-5 mt-4'>
                          {
                            registerform?"Sign Up to your account":"Sign In to your account"  
                          }
                      </h5>
                      
                    <Form className='mt-5 w-75'>
                        {registerform &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Control type="text" placeholder="Enter Username" value={userdata.username}  onChange={(e)=>{setuserdata({...userdata,username:e.target.value})}} />
                        </Form.Group>}

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Control type="email" placeholder="Enter email" value={userdata.email}  onChange={(e)=>{setuserdata({...userdata,email:e.target.value})}} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Control type="password" placeholder="Password" value={userdata.password}  onChange={(e)=>{setuserdata({...userdata,password:e.target.value})}} />
                        </Form.Group>

                           { registerform?
                               <div className='mt-4'>
                                <button onClick={handleRegister} className='btn btn-success rounded'>Register</button>
                                <p>Already a user? click here to <Link to={'/login'} style={{color:'green'}}>Login</Link></p>
                                </div>  :
                                <div className='mt-4'>
                                <button onClick={handleLogin} className='btn btn-success rounded'>Login</button>
                                <p>New user? click here to <Link to={'/register'} style={{color:'green'}}>Register</Link></p>
                                </div>
                            }   

                    </Form>
                        
                      
                    </div>
                </div>
    
            </div>
           </div>
           <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={2000}
        />
    
     
       
    
    </>
  )
}

export default Auth