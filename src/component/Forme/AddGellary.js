import { React, useState } from 'react'

import PageServices from '../../services/PageServices';
import { useNavigate } from 'react-router-dom';

function AddGellary() {

  const navigate = useNavigate();
  const [name, setName] = useState('');

  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpdate = async (e) => {

    e.preventDefault();
    if (!name || !file) {
      alert('All fields are required');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', name);
      formData.append('file', file);
      formData.append('catogary', 'image');
      // Make an API call to update the data
      const createJob = await PageServices.AddMedia(formData);

      console.log(createJob);

      if (createJob.status === 'success') {

        alert('Image Added');
        navigate(`/admin/gellary`);

      } else {
        alert('Something went wrong');
      }

    } catch (error) {
      console.error('Error updating data:', error);
      // Handle the error, e.g., show a message to the user
    }
  }



  return (

    <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Add Gallery Photo</h1>
            </div>

          </div>
        </div>
      </section>


      <section className="content">


        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Add Gallery Photo</h3>

            <div className="card-tools">

            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form" enctype="multipart/form-data" >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Image Title" required />
                    </div>
                  </div>


                </div>
                <div className="row">
                  <div className="col-sm-12">

                    <label>Image</label>
                    <div className="custom-file">
                      <label>image</label>
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                      <label className="custom-file-label" htmlFor="customFile">{file?.name ? file?.name : "choose File"}</label>
                    </div>

                  </div>

                </div>

              </form>
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary" onClick={(e) => { handleUpdate(e) }} >Submit</button>
          </div>
        </div>
      </section>

    </div>

  )
}

export default AddGellary