import { React, useState, useEffect } from 'react'

import PageServices from '../../services/PageServices';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddMember() {

  const navigate = useNavigate();
  let { memberId } = useParams();
  const [id,] = useState(memberId);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    // Check if id exists, if yes, it means we are editing an existing job

    if (id) {

      const fetchData = async () => {
        try {
          const response = await PageServices.getOneMember(id);
          console.log(response)
          if (response.status === 'success') {
            setContent(response.data.member.content)
            setName(response.data.member.name)

          } else {
            console.log('something went wrong');
          }
        } catch (error) {
          // Handle error if the request fails
          console.error('Error fetching data:', error);
        }
      };

      // Call the asynchronous function
      fetchData();
      setIsEditing(true);
    } else {
      // If no id, it means we are adding a new job
      setIsEditing(false);
    }
  }, [id]);


  const handleUpdate = async (e) => {

    e.preventDefault();
    if (!name || !content) {
      alert('All fields are required');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    formData.append('content', content);
    if (isEditing) {
      try {

        const updatedData = await PageServices.updateMember(id, formData);

        if (updatedData.status === 'success') {
          alert('Member Updated');
          navigate(`/admin/member`);
        } else {
          alert('Something went wrong');
        }

      } catch (error) {
        console.error('Error updating data:', error);
        // Handle the error, e.g., show a message to the user
      }
    } else {
      try {
        // Make an API call to update the data
        const createJob = await PageServices.addMember(formData);

        if (createJob.status === 'success') {
          setIsEditing(true);
          alert('Member Created');
          navigate(`/admin/member`);

        } else {
          alert('Something went wrong');
        }

      } catch (error) {
        console.error('Error updating data:', error);
        // Handle the error, e.g., show a message to the user
      }
    }
  };

  return (

    <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Member</h1>
            </div>

          </div>
        </div>
      </section>


      <section className="content">


        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Member</h3>

            <div className="card-tools">

            </div>
          </div>
          <div className="card-body">

            <div className="card-body">
              <form role="form" enctype="multipart/form-data" >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Content</label>
                      <textarea type="text" rows={4} className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
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

export default AddMember