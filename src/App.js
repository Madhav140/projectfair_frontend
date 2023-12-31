import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Project from './Pages/Project';
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './Context/ContextShare';

function App() {

  const {isAuthToken,setisAuthToken} = useContext(isAuthTokenContext)

  return (
   <>
   <Routes>
    <Route path='/' element={ <Home/>}/>
    <Route path='/login' element={ <Auth/>}/>
    <Route path='/register' element={<Auth register /> }/>
    <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard/>:<Home/>}/>
    <Route path='/project' element={ <Project/>}/>

   </Routes>
   <Footer/>
   </>
  );
}

export default App;
