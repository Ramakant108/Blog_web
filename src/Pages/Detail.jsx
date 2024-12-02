import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseAuth';

const Detail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState();

    useEffect(() => {
        id && getblogdetail()
    }, [id]);

    const getblogdetail = async () => {
        const docref = doc(db, "Blog", id);
        const blogData = await getDoc(docref);
        setBlog(blogData.data())
    }
    return (
        <div className='single'>
            <div
                className="blog-title-box"
                style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
            >
                <div className="overlay"></div>
                <div className="blog-title">
                    <span>{blog?.timestamp.toDate().toDateString()}</span>
                    <h2>{blog?.title}</h2>
                </div>
            </div>
            <div className="container-fluid pb-4 pt-4 padding blog-single-content">
                <div className="container padding">
                    <div className="row mx-0">
                        <div className="col-md-8">
                            <span className="meta-info text-start">
                                By <p className="author">{blog?.author}</p> -&nbsp;
                                {blog?.timestamp.toDate().toDateString()}
                            </span>
                            <p className="text-start">{blog?.description}</p>
                        </div>
                        <div className="col-md-3">
                            <h2>tags</h2>
                            <h2>popular tags</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
