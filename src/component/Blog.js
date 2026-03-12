import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import { Link } from 'react-router-dom';
import { constant } from '../constant/index.constant';

function Course() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 15;

  const fetchBlogs = async (page) => {
    try {
      const response = await PageServices.getBlogData({ page, limit: blogsPerPage });
      if (response?.data?.blog) {
        setBlogs(response.data.blog);
        setTotalBlogs(response.total || 0); // API should return total count
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmed) return;

    try {
      const response = await PageServices.deleteBlogDataById(id);
      if (response.status === 'success') {
        alert('Blog deleted successfully');
        fetchBlogs(currentPage); // Refetch data
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  console.log(totalPages);
  
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1>Blogs</h1>
          <Link to="/admin/add-blog" className="btn btn-sm btn-primary">Add Blog</Link>
        </div>
      </section>

      <section className="content">
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={blog._id}>
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={`${constant.REACT_APP_URL}/uploads/${blog.image}`}
                  alt={blog.blogTitle}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.blogTitle}</h5>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/admin/edit-blog/${blog.id}`} className="btn btn-sm btn-primary">
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(e, blog.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center flex-wrap">
              {[...Array(totalPages).keys()].map((num) => (
                <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                  <button onClick={() => setCurrentPage(num + 1)} className="page-link">
                    {num + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>
    </div>
  );
}

export default Course;
