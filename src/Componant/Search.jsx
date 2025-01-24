import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Search = ({search,handleSearch}) => {
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (search) {
            navigate(`/search?searchQuery=${search}`);
          } else {
            navigate("/");
          }
    }
    return (
        <div>
          <div className="blog-heading text-start py-2 mb-4">Search</div>
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="col-12 py-3">
              <input
                type="text"
                value={search}
                className="form-control search-input"
                placeholder="Search blog" 
                onChange={handleSearch}
              />
            </div>
            <button className="btn btn-secondary search-btn">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
      );
    };


export default Search
