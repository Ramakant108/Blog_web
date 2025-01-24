import React from 'react'
import { Link } from 'react-router-dom'

const Tags = ({tags}) => {
  return (
    <div>
      <div className='tags'>
        {
            tags?.map((tag,index)=>(
                <Link to={`/tag/${tag}`} key={index} className='tag' style={{textDecoration:'none',color:'black'}}>{tag}</Link>
                // <p className="tag" key={index}>{tag}</p>
            ))
        }
      </div>
    </div>
  )
}

export default Tags
