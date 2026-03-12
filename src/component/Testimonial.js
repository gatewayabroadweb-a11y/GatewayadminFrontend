import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';
import useAsync from '../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../constant/index.constant';
function Testimonial() {

  const { data, run } = useAsync(PageServices.getTestimonial);

  const [form, setform] = useState([]);
  console.log(data)
  useEffect(() => {
    if (data?.data?.testimonial) {
      setform(data.data.testimonial || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this Testimonial?');

    if (!confirmed) {
      return; // If not confirmed, do nothing
    }
    try {
      const response = await PageServices.deleteTestimonial(id);

      if (response.status === 'success') {
        alert("job deleted successfully")
          setform((prev) => prev.filter((item) => item._id !== id));


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
              <h1>Testimonial Page</h1>
            </div>
            <div className="col-sm-6">
              <div className="text-right">

                <Link to="/admin/add-testimonial" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  Add Testimonial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="content">

        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            {form?.map((testimonial) => (
              <div className="col-12 col-sm-4 col-md-4 d-flex align-items-stretch" key={testimonial._id}>
                <div className="card bg-light">
                  <div className="card-header text-muted border-bottom-0">
                    {`${testimonial.univercity}`}
                  </div>

                  <div className="card-body pt-0">
                    <div className="row">

                      <div className="col-3 text-center">
                        <img src={`${constant.REACT_APP_URL}/uploads/${testimonial.image}`} alt="" className="img-circle img-fluid" />

                      </div>
                      <div className="col-7">
                        <h2 className="lead"><b>{testimonial.name}</b></h2>
                        <p className="text-muted text-sm">{`${testimonial.content.substring(0, 100)}...`}</p>

                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-right d-flex justify-content-between">
                      <button
                        className="btn btn-danger "
                        onClick={(e) => { handleDelete(e, testimonial._id) }}
                      >Delete
                      </button>

                      <Link to={`/admin/edit-testimonial/${testimonial.id}`} className="btn btn-sm btn-primary">
                        <i className="fa fa-user me-2" />Update
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

export default Testimonial