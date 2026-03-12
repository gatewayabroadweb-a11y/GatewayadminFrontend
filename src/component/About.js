import React, { useState, useEffect } from 'react';
import PageServices from '../services/PageServices';

import useAsync from '../hooks/useAsync';


function About() {

  const { data } = useAsync(PageServices.getAboutPageById);

  // State variables for form fields
  const [pageTitle, setPageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageName, setPageName] = useState('');
  const [, setHtmlData] = useState('');
  const [file, setFile] = useState(null);
  const [nationalOfc, setNationalofc] = useState('');
  const [interNationalOfc, setInterNationalOfc] = useState('');
  const [students, setStudents] = useState('');
  const [experience, setExperience] = useState('');

  // useEffect to trigger the async function on mount
  console.log(data)

  // useEffect to update form fields when data changes
  useEffect(() => {
    // Check if data is available and update form fields
    if (data?.data?.page) {
      setPageTitle(data.data.page.pageTitle || ''); // Replace 'pageTitle' with the actual key from your API response
      setPageName(data.data.page.pageName || '');
      setHtmlData(data.data.page.htmldes || ''); // Replace 'pageTitle' with the actual key from your API response
      setDescription(data.data.page.description || ''); // Replace 'description' with the actual key from your API response
      setExperience(data.data.page.experience || '')
      setInterNationalOfc(data.data.page.interNationalOfc || '')
      setNationalofc(data.data.page.nationalOfc || '')
      setStudents(data.data.page.students || '')
    }
  }, [data]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // You can store the file in state or perform further actions
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!pageTitle || !pageName || !description) {
      alert('All fields are required');
      return;
    }
    const formData = new FormData();
    formData.append('pageTitle', pageTitle);
    formData.append('pageName', pageName);
    formData.append('description', description);
    formData.append('experience', experience);
    formData.append('students', students);
    formData.append('interNationalOfc', interNationalOfc);
    formData.append('nationalOfc', nationalOfc);
    if (file) {
      formData.append('file', file);
    }
    try {
      // Make an API call to update the data
      const updatedData = await PageServices.updateAboutPageById(formData);

      if (updatedData.status === 'success') {
        alert('Page info is updated');

      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };



  return (
    <>


      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>About Page</h1>
              </div>

            </div>
          </div>
        </section>


        <section className="content">


          <div className="card">
            <div className="card-header">
              <h3 className="card-title">About</h3>

              <div className="card-tools">

              </div>
            </div>
            <div className="card-body">

              <div className="card-body">
                <form role="form" >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Page Name</label>
                        <input name='pageName' type="text" value={pageName} className="form-control" placeholder="About us" disabled />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Who We Are</label>
                        <input type="text" value={pageTitle} name='pageTitle' className="form-control" onChange={(e) => setPageTitle(e.target.value)} placeholder="Enter ..." />
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* textarea */}
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" value={description} name='pageDescription' onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <label>Home Page Image</label>
                      <div className="custom-file">
                        <label>image</label>
                        <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                        <label className="custom-file-label" htmlFor="customFile">{file?.name ? file?.name : "choose File"}</label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-sm-3">
                      {/* textarea */}
                      <div className="form-group">
                        <label>National Office</label>
                        <input type="number" className="form-control" value={nationalOfc} onChange={(e) => setNationalofc(e.target.value)} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      {/* numberarea */}
                      <div className="form-group">
                        <label>International Office</label>
                        <input type="number" className="form-control" value={interNationalOfc} onChange={(e) => setInterNationalOfc(e.target.value)} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      {/* numberarea */}
                      <div className="form-group">
                        <label>Students</label>
                        <input type="number" className="form-control" value={students} onChange={(e) => setStudents(e.target.value)} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      {/* numberarea */}
                      <div className="form-group">
                        <label>Experience</label>
                        <input type="number" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>
                  </div>



                </form>
              </div>



            </div>

            <div className="card-footer">
              <button type="submit" onClick={(e) => { handleUpdate(e) }} className="btn btn-primary">Update</button>
            </div>

          </div>


        </section>

      </div>
    </>
  )
}

export default About