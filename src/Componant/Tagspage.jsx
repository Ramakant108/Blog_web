import { collection,  getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseAuth';
import BlogSection from './BlogSection';
import Spiner from './Spiner';

const Tagspage = () => {
    const [loading,setLoading]=useState(false)
    const [tagBlog,setTagBlog]=useState([])
    const {tag}=useParams();
    const getTagblog=async()=>{
        setLoading(true)
        const ref=collection(db,'Blog');
        const tagQuery=query(ref,where("tags",'array-contains',tag));
        const onSnapshot=await getDocs(tagQuery)
        const list=onSnapshot.docs.map((blog)=>({id:blog.id,...blog.data()}))
        setTagBlog(list)
        setLoading(false)
    }

    useEffect(()=>{
        getTagblog()
    },[])

    if(loading){
        <Spiner/>
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="blog-heading mb-4 py-2 text-center ">Tag:<span><strong>{tag}</strong></span></div>
            {tagBlog.map((tag)=>(
                <div className="col-md-6">
                <BlogSection key={tag.id} blog={tag}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Tagspage
