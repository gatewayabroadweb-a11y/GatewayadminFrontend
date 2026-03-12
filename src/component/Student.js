import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../constant/index.constant';
function Student() {

  const { data, loading, error, run } = useAsync(PageServices.getStudent);

  const [form, setform] = useState([]);
  console.log(data)
  useEffect(() => {
    if (data?.data?.media) {
      setform(data.data.media || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);



  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this Student?');

    if (!confirmed) {
      return; // If not confirmed, do nothing
    }
    try {
      const response = await PageServices.deleteStudent(id);

      if (response.status === 'success') {
        run();

      } else {
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
              <h1>Student Page</h1>
            </div>
            <div className="col-sm-6">
              <div className="text-right">

                <Link to="/admin/add-students" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  Add Scholler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="content">

        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            {form.map((course) => (
              <div className="col-12 col-sm-3 col-md-3 d-flex align-items-stretch" key={course._id}>
                <div className="card bg-light">
                  <div className="card-header text-muted border-bottom-0">
                    {`${course.univercity?.substring(0, 30)}...`}
                  </div>

                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="lead"><b>{course.name}</b></h2>
                        <p className="text-muted text-sm">{`${course.content?.substring(0, 100)}...`}</p>

                      </div>
                      <div className="col-5 text-center">
                        <img src={`${constant.REACT_APP_URL}/uploads/${course.image}`} alt="" className="img-circle st-img-admin" />

                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-right">
                      <Link to={`/admin/edit-students/${course.id}`} className="btn btn-sm btn-primary mr-2">
                        <i className="fa fa-edit" />
                      </Link>
                      <Link to='' onClick={(e) => handleDelete(e, course.id)} className="btn btn-sm btn-danger">
                        <i className="" />x
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

export default Student