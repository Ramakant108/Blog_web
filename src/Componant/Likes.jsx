import React from 'react'

const Likes = ({likes,handlelikes,userId}) => {

    const LikeStatus=()=>{
        if(likes?.length > 0){
            return likes.find((id)=>id===userId)?(
                <>
                <i class="bi bi-hand-thumbs-up-fill"/>
                &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
             </>
            )
           :(
            <>
            <i class="bi bi-hand-thumbs-up"/>
            &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </>
           )
           
        }
        return (
            <>
             <i class="bi bi-hand-thumbs-up"/>
             &nbsp;Like
            </>
        )
       
    }
  return (
     <>
     <span style={{float:'right',  cursor:"pointer",  marginTop:"-7px"}} onClick={handlelikes}>
         <button className='btn btn-primary' type='button'>
            <LikeStatus/>
         </button>
     </span>
     </>
  )
}

export default Likes
