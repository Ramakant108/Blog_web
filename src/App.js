import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import './Style.scss'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/about';
import Auth from './Pages/Auth';
import CreateAditblog from './Pages/CreateAditblog';
import Notfound from './Pages/Notfound';
import Header from './Componant/Header/navbar';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { auth } from './firebaseAuth';
import { onAuthStateChanged } from "firebase/auth";
import Detail from './Pages/Detail';

function App() {
   const navigate=useNavigate();
   const [Puser,setPuser]=useState(null)
    useEffect(()=>{
          onAuthStateChanged(auth,async(user)=>{
            if(user){
              setPuser(user)
              navigate('/')
            }
            else{
              setPuser(null)
              navigate('/auth');
            }
          })
          
    },[])
   
  return (
    <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        {Puser?.uid?<Header user={Puser}/>:<></>}
        <Routes>
        <Route path='/' element={<Home user={Puser}/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/createblog' element={<CreateAditblog user={Puser} />}/>
        <Route path='/update/:id' element={<CreateAditblog user={Puser} />}/>
        <Route path='*' element={<Notfound/>}/>
       </Routes>
    </div>
  );
}

export default App;
