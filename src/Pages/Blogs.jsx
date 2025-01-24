import React, { useEffect, useState } from "react";
import BlogSection from "../Componant/BlogSection";
import { collection, getDocs, query, orderBy, startAfter, endBefore, limit } from "firebase/firestore";
import { db } from "../firebaseAuth";
import Spiner from "../Componant/Spiner";
import Pagenation from "../Componant/Pagenation";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getBlogs();
    calculateTotalPages();
  }, []);

  const getBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "Blog");
    const blogQuery = query(blogRef, orderBy("title"), limit(4));
    const onSnapshot = await getDocs(blogQuery);
    setBlogs(onSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setFirstVisible(onSnapshot.docs[0]); // Track the first document
    setLastVisible(onSnapshot.docs[onSnapshot.docs.length - 1]); // Track the last document
    setLoading(false);
  };

  const calculateTotalPages = async () => {
    const blogRef = collection(db, "Blog");
    const onSnapshot = await getDocs(blogRef);
    const totalBlogs = onSnapshot.docs.length;
    const totalPages = Math.ceil(totalBlogs / 4); // Assuming 4 blogs per page
    setTotalPages(totalPages);
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "Blog");
    const nextQuery = query(blogRef, orderBy("title"), startAfter(lastVisible), limit(4));
    const onSnapshot = await getDocs(nextQuery);
    setBlogs(onSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setFirstVisible(onSnapshot.docs[0]);
    setLastVisible(onSnapshot.docs[onSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchPrev = async () => {
    setLoading(true);
    const blogRef = collection(db, "Blog");
    const prevQuery = query(blogRef, orderBy("title"), endBefore(firstVisible), limit(4));
    const onSnapshot = await getDocs(prevQuery);
    setBlogs(onSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setFirstVisible(onSnapshot.docs[0]);
    setLastVisible(onSnapshot.docs[onSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handlePageChange = (value) => {
    if (value === "Next" && currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
      fetchMore();
    } else if (value === "Previous" && currentPage > 1) {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };

  if (loading) {
    return <Spiner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="blog-heading text-start py-2 mb-4">Blogs</div>
        {blogs.map((blog) => (
          <div className="col-6" key={blog.id}>
            <BlogSection blog={blog} />
          </div>
        ))}
      </div>
      <Pagenation
        currentPage={currentPage}
        noOfPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Blogs;
