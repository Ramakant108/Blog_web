import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseAuth';
import BlogSection from '../Componant/BlogSection';

const CategoryPage = () => {
    const {category}=useParams()
    const [loading,setLoading]=useState(false);
    const [categoryBlog,setCategoryBlog]=useState([]);

    const getCategoryBlog=async()=>{
        setLoading(true)
        const ref=collection(db,"Blog");
        const categoryQuery=query(ref,where('category','==',category));
        const onSnapshot=await getDocs(categoryQuery);
        const list =onSnapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
        setCategoryBlog(list);
        setLoading(false)
    }

    useEffect(()=>{
            getCategoryBlog();
    },[])
  return (
    <div>
       <div className='container'>
        <div className="row">
            <div className="blog-heading mb-4 py-2 text-center ">Category:<span><strong>{category}</strong></span></div>
            {categoryBlog.map((blog)=>(
                <div className="col-md-6">
                <BlogSection key={blog.id} blog={blog}/>
                </div>
            ))}
        </div>
    </div>
    </div>
  )
}

export default CategoryPage
