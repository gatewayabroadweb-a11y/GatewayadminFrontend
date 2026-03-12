import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../constant/index.constant';
function Course() {

  const { data } = useAsync(PageServices.getCourse);

  const [form, setform] = useState([]);
  console.log(data)
  useEffect(() => {
    if (data?.data?.page) {
      setform(data.data.page || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);

  return (
    

    <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Course Page</h1>
          </div>
          <div className="col-sm-6">
          <div className="text-right">
                  
                  
                </div>
                </div>
        </div>
      </div>
    </section>

  
    <section className="content">

    <div className="card-body pb-0">
        <div className="row d-flex align-items-stretch">
     {form.map((course)=>(
          <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" key={course._id}>
            <div className="card bg-light">
              <div className="card-header text-muted border-bottom-0">
                {`${course.pageTitle.substring(0, 30)}...`}
              </div>
              
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col-7">
                    <h2 className="lead"><b>{course.pageName}</b></h2>
                    <p className="text-muted text-sm">{`${course.description.substring(0, 100)}...`}</p>
                    
                  </div>
                  <div className="col-5 text-center">
                    <img src={`${constant.REACT_APP_URL}/uploads/${course.image}`} alt="" className="img-circle img-fluid" />
                    <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="text-right">
                  
                <Link to={`/admin/editcourse/${course.id}`} className="btn btn-sm btn-primary">
                <i className="fa fa-edit me-2" />Update Course
                </Link>
                  
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

export default Course