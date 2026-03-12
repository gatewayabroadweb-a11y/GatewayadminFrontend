import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../constant/index.constant';
function Member() {

  const { data, loading, error, run } = useAsync(PageServices.getMember);

  const [form, setform] = useState([]);
  console.log(data)
  useEffect(() => {
    if (data?.data?.member) {
      setform(data.data.member || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);



  const handleDelete = async (e,id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this Testimonial?');

  if (!confirmed) {
    return; // If not confirmed, do nothing
  }
    try {
      const response = await PageServices.deleteMember(id);

      if(response.status === 'success'){
        run();
                
      }else{
        alert('something went wrong')
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error fetching data:', error);
    }
  }; 

  return (
    

    <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Member Page</h1>
          </div>
          <div className="col-sm-6">
          <div className="text-right">
                  
                  <Link to="/admin/add-member" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  Add Member
                </Link>
                </div>
                </div>
        </div>
      </div>
    </section>

  
    <section className="content">

    <div className="card-body pb-0">
        <div className="row gx-3 d-flex align-items-stretch">
     {form.map((course)=>(
        <div className='col-lg-4 col-md-6'>
           <div className="card member-card">
            <div className='memeber-img'>
              <img src={`${constant.REACT_APP_URL}/uploads/${course.image}`} className="card-img-top" alt="..." />
           </div>
           <div className="card-body">
             <h5 className="card-title">{course.name}</h5>
             <p className="card-text">{course?.content?.substring(0,50)}</p>
             <div className="text-right d-flex justify-content-between">
             <button
                  className="btn btn-danger " 
                  onClick={(e)=>{handleDelete(e,course.id)}}
                >Delete
                </button>
             <Link to={`/admin/edit-member/${course.id}`} className="btn btn-primary">Update</Link>
             </div>
           </div>
         </div>
         </div>
      ))}
        </div>
      </div>
      

    </section>
    
  </div>
  
  )
}

export default Member