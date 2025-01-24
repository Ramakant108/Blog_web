import React from 'react'
import { Link } from 'react-router-dom'

const CategoryBlog = ({ categoryCount }) => {
    return (
        <div className='widget'>
            <div className="blog-heading mb-4 py-2 text-start ">category</div>
            <div className="link-widget">
                <ul>
                    {categoryCount.map((category,index) => (
                            <li key={index}>
                                   <Link to={`/category/${category.category}`} style={{textDecoration:'none',float:'left',color:'#777'}}>
                                   {category.category}<span>({category.count})</span>
                                   </Link>
                            </li>
                     ))}
                </ul>
            </div>
        </div>
    )
}

export default CategoryBlog

