import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
const Scroller = () => {
   const [hide,setHide]=useState(false);
   const toggleHide=()=>{
      if(window.pageYOffset>200){
        setHide(true)
      }
      else{
        setHide(false)
      }
   }
   
   const handleScroll=()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
   }
   useEffect(()=>{
          window.addEventListener("scroll",toggleHide)
          return ()=>{
            window.removeEventListener('scroll',toggleHide)
          }
   },[])

  return (
    <div className='scroll-to-top'>
      {hide&&(
        <span onClick={handleScroll}>
            <i className='bi bi-arrow-up'></i>
        </span>
      )}
    </div>
  )
}



export default Scroller
