import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseAuth';
import BlogSection from '../Componant/BlogSection';
import Spiner from '../Componant/Spiner';
import { toast } from 'react-toastify';
import Tags from '../Componant/Tags';
// import FeatureBlogs from '../Componant/FeatureBlogs';
import TrendingBlog from '../Componant/TrendingBlog';
import Search from '../Componant/Search';
import { useLocation } from 'react-router-dom';
import { isEmpty, isNull, orderBy } from 'lodash';
import CategoryBlog from '../Componant/CategoryBlog';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = ({user,active,setActive}) => {
  const [loading,setLoading]=useState(true);
  const [blogs,setBlogs]=useState([]);
  const [totalblog,setTotalblog]=useState([])
  const [tags,setTags]=useState()
  const [hide,setHide]=useState(false)
  const [lastVisible,setLastVisible]=useState(null)
  const [trendblog,setTrendblog]=useState([]);
  const [search,setSearch]=useState("");
  const queryString=useQuery()
  const searchquery=queryString.get("searchQuery")
  const location=useLocation()
 
  useEffect(()=>{
    getTrendingBlog()
    
    if(isNull(searchquery)){
      setHide(false)
      setSearch("")
      getBlogs()
    }
    console.log(searchquery)
    const unsub=onSnapshot(collection(db,"Blog"),
    (snapshot)=>{
      const tag=snapshot.docs.map((doc)=>(doc.get("tags")))
      const tag1=[]
      tag.forEach((t)=>{
        tag1.push(...t)
      })
      const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
      const uniquetag=[...new Set(tag1)];
      setTags(uniquetag);
      setTotalblog(list)
      // getBlogs()
      // setBlogs(list);
      setActive("home");
      setLoading(false);
    },
    (error)=>{
      console.log(error)
    }
  )
  return ()=>{
    unsub()
    getTrendingBlog()
  }
  },[searchquery,active])

  useEffect(()=>{
    if(!isNull(searchquery)){
      
        searchBlog()
    }
},[searchquery])

useEffect(()=>{
     getBlogs()
},[active])

   const searchBlog=async()=>{
    setLoading(true)
    const searchtitle=[];
    // const searchtag=[];
    const blogref=collection(db,"Blog");
    const blogquery=query(blogref,where("title","==",searchquery));
    const searchedblog=await getDocs(blogquery);

    // const tagblogquery=query(blogref,where("tags","array-contains",searchquery));
    // const tagblogs=await getDocs(tagblogquery);

    // tagblogs.forEach((doc)=>{searchtag.push({id:doc.id,...doc.data()})})
    searchedblog.forEach((doc)=>{searchtitle.push({id:doc.id,...doc.data()})})
    // const totalBlogs=searchtitle.concat(searchtag);
    // setBlogs(totalBlogs)
    setBlogs(searchtitle)
    setHide(true)
    setLoading(false)
   }

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
        getBlogs()
        setLoading(false)
      } catch (error) {
        toast.error(error.code)
      }
    }
  }
  const updateState=(snapshot)=>{
    if(snapshot.docs.length!==0){
      const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
      setBlogs((blog)=>[...blog,...list])
      setLastVisible(snapshot.docs[snapshot.docs.length-1])
    }
    else{
      toast.info("no more blogs")
      setHide(true)
    }
  }

  const fetchmoreBlog=async()=>{
    const blogref=collection(db,"Blog");
    const trendquery=query(blogref,orderBy("title"),limit(4),startAfter(lastVisible));
    const snapshot= await getDocs(trendquery);
    updateState(snapshot)
  }
  const getBlogs=async()=>{
    const blogref=collection(db,"Blog");
    const trendquery=query(blogref,orderBy("title"),limit(4))
    const snapshot= await getDocs(trendquery);
    const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
    setBlogs(list)
    setLastVisible(snapshot.docs[snapshot.docs.length-1])
  }

  const handleSearch=(e)=>{
     const {value}=e.target;
     if(isEmpty(value)){
      setHide(false)
      getBlogs()
     }
     setSearch(value)
  }

  const count=totalblog.reduce((prevalue,currentvalue)=>{
        const categoryName=currentvalue.category;
        if(!prevalue.hasOwnProperty(categoryName)){
          prevalue[categoryName]=0
        }
        prevalue[categoryName]++;
       return prevalue;
  },{})

  

  const categoryCount=Object.keys(count).map((k)=>({
    category:k,
    count:count[k]
  }))
  console.log(categoryCount)

  if(loading){
    return <Spiner/>;
  }

  return (
    <div className='container-fluid pb-4 pt-4'>
      <div className="container">
        <div className="row mx-0">
            <TrendingBlog blogs={trendblog}/>
            <div className="col-md-8">
            <div className="blog-heading mb-4 py-2 text-start ">Daily blog</div>
              {blogs.length ===0&&location.pathname!=='/'?
             ( <>
              <h4 className='text-center'>
                No Blog found with search keyword:{" "}
                <strong>{searchquery}</strong>
              </h4>
            </>):<></>
              }
              {blogs.map((blog)=>(
                <BlogSection key={blog.id} blog={blog} user={user} handledelete = {handledelete}/>
              ))}
              {/* <BlogSection blog={blog} user={user} handledelete = {handledelete}/> */}
              {!hide&&(<button className="btn btn-primary text-center"  onClick={()=>fetchmoreBlog()}>Load More</button>)
            }
            </div>
            <div className="col-md-3">
              <Search search={search} handleSearch={handleSearch}/>
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
              <Tags tags={tags}/>
              <CategoryBlog categoryCount={categoryCount}/>
              {/* <FeatureBlogs blogs={blogs}/> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
