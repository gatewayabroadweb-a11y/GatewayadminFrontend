import React, { useState, useEffect } from 'react';
import PageServices from '../../services/PageServices';
import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import { constant } from '../../constant/index.constant';


function Gellary() {

  const { data, loading, error, run } = useAsync(PageServices.getPhoto);

  const [form, setform] = useState([]);

  useEffect(() => {
    if (data?.data?.media) {
      setform(data.data.media || []); // Assuming data.data.form is an array of contact objects
    }
  }, [data]);

  console.log(form);

  const handleDelete = async (e, id) => {

    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this Image?');

    if (!confirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      const response = await PageServices.deleteMedia(id);

      if (response.status === 'success') {
        alert("Job deleted successfully")
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
              <h1>Gallery</h1>
            </div>
            <div className="col-sm-6">
              <div className="text-right">

                <Link to="/admin/add-gellary" className="btn btn-sm btn-primary">
                  <i className="fa fa-Page" />
                  Add Photo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="content">
        <div className="card-body pb-0">
          <div className="row">
            {form.map((video) => (
              <div className="col-12 col-sm-4 col-md-4 mt-3 st-yt-v " key={video._id}  >
                <div className='gellary-img-admin'>
                  <img src={`${constant.REACT_APP_URL}/uploads/${video.mediaLink}`} alt="" className=" " />
                  <button
                    onClick={(e) => handleDelete(e, video.id)}
                    className="btn btn-danger "
                  ><i className='fa fa-close'></i></button>
                </div>


              </div>
            ))}
          </div>
        </div>


      </section>

    </div>

  )
}

export default Gellary