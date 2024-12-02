import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseAuth';
import BlogSection from '../Componant/BlogSection';
import Spiner from '../Componant/Spiner';
import { toast } from 'react-toastify';
import Tags from '../Componant/Tags';
import FeatureBlogs from '../Componant/FeatureBlogs';
import TrendingBlog from '../Componant/TrendingBlog';

const Home = ({user}) => {
  const [loading,setLoading]=useState(true);
  const [blogs,setBlogs]=useState([]);
  const [tags,setTags]=useState()
  const [trendblog,setTrendblog]=useState([]);

  useEffect(()=>{
    getTrendingBlog()
    const unsub=onSnapshot(collection(db,"Blog"),
    (snapshot)=>{
      const tag=snapshot.docs.map((doc)=>(doc.get("tags")))
      const tag1=[]
      tag.forEach((t)=>{
        tag1.push(...t)
      })
      const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
      const uniquetag=[...new Set(tag1)]
      setTags(uniquetag)
      setBlogs(list)
      setLoading(false);
    },
    (error)=>{
      console.log(error)
    }
  )

  return ()=>{
    unsub()
  }
  },[])

  const getTrendingBlog=async()=>{
        const blogref=collection(db,"Blog");
        const trendquery=query(blogref,where("isTrending","==","yes"))
        const snapshot= await getDocs(trendquery);
        const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
        setTrendblog(list)
  }

  const handledelete=async(id)=>{
    if(window.confirm("Are you sure to delete blog")){
      try {
        setLoading(true)
        await deleteDoc(doc(db,"Blog",id))
        toast.success("Blog deleted successfuly")
        setLoading(false)
      } catch (error) {
        toast.error(error.code)
      }
    }
  }
  
  // console.log("blogs:",blogs)
  if(loading){
    return <Spiner/>;
  }
  return (
    <div className='container-fluid pb-4 pt-4'>
      <div className="container">
        <div className="row mx-0">
            <TrendingBlog blogs={trendblog}/>
            <div className="col-md-8">
              <BlogSection blogs={blogs} user={user} handledelete = {handledelete}/>
            </div>
            <div className="col-md-3">
              <Tags tags={tags}/>
              <FeatureBlogs blogs={blogs}/>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Home
