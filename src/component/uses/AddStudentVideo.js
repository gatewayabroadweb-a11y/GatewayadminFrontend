import { React, useState } from 'react'

import PageServices from '../../services/PageServices';
import { useNavigate } from 'react-router-dom';

function AddStudentVideo() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleUpdate = async (e) => {

    e.preventDefault();
    if (!name || !content) {
      alert('All fields are required');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', name);
      formData.append('mediaLink', content);
      formData.append('catogary', 'video');
      // Make an API call to update the data
      const createJob = await PageServices.AddMedia(formData);

      if (createJob.status === 'success') {

        alert('Video Added');
        navigate(`/admin/studentvideo`);

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
              <h1>Add YouTube Video</h1>
            </div>

          </div>
        </div>
      </section>

      <section className="content">

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Add YouTube Video</h3>

            <div className="card-tools">

            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form" enctype="multipart/form-data" >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>title</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Course Name" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    {/* textarea */}
                    <div className="form-group">
                      <label>YouTube Video Link</label>
                      <input type="text" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Course Name" required />
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

export default AddStudentVideo