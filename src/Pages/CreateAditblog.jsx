import React, { useEffect, useState } from "react";
import { db} from "../firebaseAuth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const initialState = {
  title: "",
  tags: [],
  isTrending: "",
  category: "",
  description: "",
  comments:[],
  likes:[]
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const CreateAditBlog = ({user}) => {
  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  // const [imgurl,setImgurl]=useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [loading,setLoading]=useState(true)
  // const [state,setState]=useState("");
  const {id}=useParams();
  const navigate=useNavigate()


 
useEffect(()=>{
  const uploadfile=async()=>{
    const cloud_name='ddyk2smww';
    const preset_name="Blogweb";

    const data=new FormData();
    data.append("file",file);
    data.append("upload_preset",preset_name)
    const res=await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
      method:'POST',
      body:data
    });
    const downloadurl=await res.json();
    // console.log(downloadurl.secure_url)
    // setImgurl(downloadurl.secure_url)

    setFormData({...formData,imgUrl:downloadurl.secure_url})
}
 file&&uploadfile()
},[file])
 
  useEffect(()=>{
    if(!id) return;
    
     user&&getBlogDetail();
     setLoading(false)
  },[id])
   
  const getBlogDetail=async()=>{
    const blogdetail=await getDoc(doc(db,"Blog",id));
    setFormData({...blogdetail.data()})
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));  
  };

  // Handle adding tags
  const handleTagKeyDown = (e) => {
    if((e.key==="Enter"||e.key===",")&&currentTag.trim()!==""){
      e.preventDefault()
      if(!formData.tags.includes(currentTag.trim())){
        setFormData((prev)=>({
          ...prev,tags:[...prev.tags,currentTag.trim()]
        }))
        setCurrentTag("")
      }
    }
  };
  // Handle removing tags
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
   
   
      if(formData.title&&formData.category&&formData.isTrending&&formData.tags&&formData.description){
        if(!id){
          try {
            if(!file){
              toast.info("Image is mandatory")
              return
            }
            await addDoc(collection(db,"Blog"),{
              ...formData,
            
              timestamp: serverTimestamp(),
              author: user.displayName,
              userId: user.uid,
             })
             
             toast.success("Blog created Successfuly")
          }
          catch (error) {
            toast.error(error.code)
            console.log(error)
          }
        }
        else{
          try {
            await updateDoc(doc(db,"Blog" ,id),{
              ...formData,
              timestamp: serverTimestamp(),
              author: user.displayName,
              userId: user.uid,
             })
             
             toast.success("Blog Updated Successfuly")
          }
          catch (error) {
            toast.error(error.code)
            console.log(error)
          }
        }
        
    } 
    else{
      toast.error("all fild are mandatory")
    }
    navigate('/')
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white"
        style={{ width: "500px", fontSize: "16px" }}
      >
        <h2 className="text-center mb-4">Create Blog</h2>

        {/* Title Input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Custom Tag Input */}
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div className="tag-input-container border rounded p-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="badge bg-primary me-2">
                {tag}{" "}
                <button
                  type="button"
                  className="btn-close btn-close-white btn-sm ms-2"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label="Remove"
                ></button>
              </span>
            ))}
            <input
              type="text"
              className="border-0"
              placeholder="Type and press Enter"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              style={{ outline: "none", flex: 1 }}
            />
          </div>
        </div>

        {/* Radio Buttons for Trending */}
        <div className="mb-3">
          <label className="form-label">Is Trending?</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="isTrending"
                id="trendingYes"
                value="yes"
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label htmlFor="trendingYes" className="form-check-label">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="isTrending"
                id="trendingNo"
                value="no"
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label htmlFor="trendingNo" className="form-check-label">
                No
              </label>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select a Category</option>
            {categoryOption.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description Text Area */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter Blog Description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        {/* File Input */}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" 
        className="btn btn-primary w-100"
        // disabled={lastProgress!==null&&lastProgress<100}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAditBlog;
