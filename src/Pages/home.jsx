import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseAuth';
import BlogSection from '../Componant/BlogSection';

const Home = ({user}) => {

  const [blogs,setBlogs]=useState([]);

  useEffect(()=>{
    const unsub=onSnapshot(collection(db,"Blog"),
    (snapshot)=>{
      const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
      setBlogs(list)
    },
    (error)=>{
      console.log(error)
    }
  )

  return ()=>{
    unsub()
  }
  },[])

  console.log("blogs:",blogs)

  return (
    <div className='container-fluid pb-4 pt-4'>
      <div className="container">
        <div className="row mx-0">
            <h1 className='text-center'>treanding blog</h1>
            <div className="col-md-8">
              <BlogSection blogs={blogs}/>
            </div>
            <div className="col-md-3">
              <h2 className='text-center'>blogs tag</h2>
              <h3 className='text-center'>most popular section</h3>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Home
