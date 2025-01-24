import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseAuth';
import Tags from '../Componant/Tags';
import RelatedBlog from '../Componant/RelatedBlog';
import UserComments from '../Componant/UserComments';
import { isEmpty } from 'lodash';
import CommentBlox from '../Componant/CommentBlox';
import { toast } from 'react-toastify';
import Likes from '../Componant/Likes';

const Detail = ({user}) => {
    const userId=user?.uid;
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const [btags, setBtags] = useState([]);
    const [rblog, setRblog] = useState([]);
    const [comments, setComments] = useState([]);
    let [likes,setLikes]=useState([]);
    const [userComment,setUserComment]=useState("")

    useEffect(() => {
        id && getblogdetail()
    }, [id]);

    const getblogdetail = async () => {
        const docref = doc(db, "Blog", id);
        const ref = collection(db, "Blog")
        const blogData = await getDoc(docref);
        const allBlog = await getDocs(ref)
        const relatedblogquery = query(ref, where('tags', 'array-contains-any', blogData.data().tags, limit(3)))
        const relatedblogsnaphot = await getDocs(relatedblogquery);

        const relatedblog = relatedblogsnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        const tag = allBlog.docs.map((doc) => (doc.get("tags")));
        const tags = []
        tag.forEach((t) => {
            tags.push(...t)
        })
        const uniquetag = [...new Set(tags)]
        setComments(blogData.data().comments ? blogData.data().comments : [])
        setLikes(blogData?.data().likes?blogData.data().likes:[])
        setRblog(relatedblog)
        setBtags(uniquetag);
        setBlog(blogData.data())
        console.log(relatedblog)
    }


    const handleComment=async(e)=>{
        e.preventDefault();
      comments.unshift({
        body:userComment,
        name:user.displayName,
        createdAt:Timestamp.fromDate(new Date())
      })
      setComments(comments);
       toast.success("Comment Posted successfuly")
      await updateDoc(doc(db,"Blog",id),{...blog,comments,timestamp:serverTimestamp()})
      setUserComment("")

    }

    const handlelikes=async()=>{

        if(blog?.likes){
            const index=likes.findIndex((id)=>id===userId)
            if(index===-1){
                likes.push(userId)
                setLikes([...new Set(likes)])
            }
            else{
                likes=likes.filter((id)=>id!==userId);
                setLikes(likes)
            }
            await updateDoc(doc(db,"Blog",id),{
                ...blog,
                likes,
                timestamp:serverTimestamp()
            })
        }
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
                                <Likes likes={likes} handlelikes={handlelikes} userId={userId}/>
                            </span>
                            
                            <p className="text-start">{blog?.description}</p>
                            <div className="text-start">
                                <Tags tags={blog?.tags} />
                            </div>
                            <br />
                            <div className="custombox">
                                <div className="scroll">
                                    <h4 className="small-title">{comments.length}  Comment</h4>
                                    {isEmpty(comments) ? (
                                        <UserComments
                                            msg={
                                                "No Comment yet posted on this blog. Be the first to comment"
                                            }
                                        />
                                    ) : (
                                        <>
                                            {comments?.map((comment) => (
                                                <UserComments {...comment} />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                            <CommentBlox
                            userComment={userComment}
                            setUserComment={setUserComment}
                            handleComment={handleComment}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="blog-heading text-start py-2 mb-4">Tags</div>
                            <Tags tags={btags} />
                        </div>
                    </div>
                    <RelatedBlog blogs={rblog} id={id} />
                </div>
            </div>
        </div>
    );
}

export default Detail
