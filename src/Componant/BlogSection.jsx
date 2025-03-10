import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; 
import shortdes from '../utility/helping';
import { Link } from 'react-router-dom';



const BlogSection = ({ blog, user ,handledelete}) => {
  return (
    <div>
      
        <div className="row pb-4" key={blog.id}>
          <div className="col-md-5">
            <div className="hover-blogs-img">
              <div className="blogs-img">
                  <img src={blog.imgUrl} alt={blog.title} />
                  <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7 py-2">
            <div className="text-start">
              <h6 className='category catg-color'>{blog.category}</h6>
              <span className='title py-2'>{blog.title}</span>
              <span className='meta-info'>
                <p className='author'>{blog.author}</p> - &nbsp;
                {blog.timestamp.toDate().toDateString()}
              </span>
            </div>
             <div className="short-description">
              {shortdes(blog.description,120)}
             </div>
             <Link to={`/detail/${blog.id}`}> 
             <button className='btn btn-read'>Read More</button>
             </Link>
             {user?.uid&&blog.userId===user.uid&&(
                <div className='d-flex aline-items-center' style={{float:"right"}}>
                <FontAwesomeIcon
                   icon={faTrash}
                   className='fa-trash'
                   style={{ margin: "13px",cursor:"pointer"}}
                   size="1x"
                   onClick={()=>handledelete(blog.id)}
                 />
                 <Link to={`/update/${blog.id}`}>
                 <FontAwesomeIcon
                   icon={faEdit}
                   className='fa-edit'
                   style={{margin:"13px",cursor:"pointer"}}
                   size="1x"
                 /></Link>
                 
                 
                </div>
             )}
            
          </div>
        </div>
     
    </div>
  )
}

export default BlogSection
